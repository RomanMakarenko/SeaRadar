import type { Vessel } from "../app/vessel-model";
import { transformPositionReport } from "./position-report-transformer";
import {
  SnapshotReadCancelled,
  startAISStreamReader,
  type SnapshotErrorCode,
  type SnapshotReaderHandle,
  type SnapshotReaderHandlers,
  type TimerApi,
} from "./aisstream-reader";

export const SNAPSHOT_WINDOW_MS = 15_000;
export const SNAPSHOT_VESSEL_LIMIT = 100;

export type SnapshotSuccess = {
  ok: true;
  vessels: Vessel[];
  collectedAt: string;
  windowSeconds: 15;
  count: number;
  truncated: boolean;
  reason: "window_elapsed" | "limit_reached";
};

export type SnapshotCollectionResult =
  | SnapshotSuccess
  | { ok: false; code: SnapshotErrorCode };

export type SnapshotReaderStarter = (
  handlers: SnapshotReaderHandlers,
) => SnapshotReaderHandle;

export type CollectSnapshotOptions = {
  apiKey: string;
  signal?: AbortSignal;
  startReader?: SnapshotReaderStarter;
  timer?: TimerApi;
  now?: () => Date;
};

const defaultTimer: TimerApi = {
  setTimeout(callback, delay) {
    return setTimeout(callback, delay);
  },
  clearTimeout(handle) {
    clearTimeout(handle);
  },
};

export function collectSnapshot({
  apiKey,
  signal,
  startReader = (handlers) => startAISStreamReader({ apiKey }, handlers),
  timer = defaultTimer,
  now = () => new Date(),
}: CollectSnapshotOptions): Promise<SnapshotCollectionResult> {
  return new Promise((resolve, reject) => {
    const vessels = new Map<string, Vessel>();
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;
    let reader: SnapshotReaderHandle | null = null;
    let subscribed = false;
    let settled = false;
    let cleanedUp = false;
    let readerStopped = false;
    let timeoutCleared = false;

    const stopReader = (handle: SnapshotReaderHandle | null) => {
      if (handle === null || readerStopped) {
        return;
      }

      readerStopped = true;
      try {
        handle.stop();
      } catch {
        // Cleanup must not replace the original result.
      }
    };

    const cleanup = () => {
      if (cleanedUp) {
        return;
      }

      cleanedUp = true;

      if (timeoutHandle !== null && !timeoutCleared) {
        timeoutCleared = true;
        try {
          timer.clearTimeout(timeoutHandle);
        } catch {
          // Cleanup must not replace the original result.
        }
        timeoutHandle = null;
      }

      stopReader(reader);
      signal?.removeEventListener("abort", onAbort);
    };

    const settle = (result: SnapshotCollectionResult) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      resolve(result);
    };

    const fail = (code: SnapshotErrorCode) => {
      settle({ ok: false, code });
    };

    const cancel = () => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      reject(new SnapshotReadCancelled());
    };

    const finishSuccess = (
      reason: SnapshotSuccess["reason"],
      truncated: boolean,
    ) => {
      if (settled) {
        return;
      }

      let collectedAt: string;
      try {
        collectedAt = now().toISOString();
      } catch {
        fail("internal");
        return;
      }

      settle({
        ok: true,
        vessels: Array.from(vessels.values()),
        collectedAt,
        windowSeconds: 15,
        count: vessels.size,
        truncated,
        reason,
      });
    };

    const onAbort = () => {
      cancel();
    };

    const onText = (text: string) => {
      if (settled) {
        return;
      }

      let payload: unknown;
      try {
        payload = JSON.parse(text);
      } catch {
        fail("provider_error");
        return;
      }

      try {
        const vessel = transformPositionReport(payload);
        if (vessel === null) {
          return;
        }

        const current = vessels.get(vessel.id);
        if (current !== undefined) {
          if (Date.parse(vessel.timestamp) > Date.parse(current.timestamp)) {
            vessels.set(vessel.id, vessel);
          }
          return;
        }

        vessels.set(vessel.id, vessel);
        if (vessels.size === SNAPSHOT_VESSEL_LIMIT) {
          finishSuccess("limit_reached", true);
        }
      } catch {
        fail("internal");
      }
    };

    if (signal?.aborted) {
      cancel();
      return;
    }

    signal?.addEventListener("abort", onAbort, { once: true });

    try {
      timeoutHandle = timer.setTimeout(() => {
        if (subscribed) {
          finishSuccess("window_elapsed", false);
        } else {
          fail("connect_failed");
        }
      }, SNAPSHOT_WINDOW_MS);
    } catch {
      fail("internal");
      return;
    }

    try {
      const createdReader = startReader({
        onSubscribed() {
          if (!settled) {
            subscribed = true;
          }
        },
        onText,
        onError: fail,
      });

      if (settled) {
        stopReader(createdReader);
      } else {
        reader = createdReader;
      }
    } catch {
      fail("internal");
    }
  });
}

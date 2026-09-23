const AISSTREAM_URL = "wss://stream.aisstream.io/v0/stream";
const DEFAULT_WINDOW_MS = 15_000;
const BOUNDING_BOXES = [[[50.75, 0.95], [51.25, 1.95]]] as const;
const FILTER_MESSAGE_TYPES = ["PositionReport"] as const;

type SocketEventType = "open" | "message" | "error" | "close";

type SocketEvent = {
  data?: unknown;
};

export type SnapshotErrorCode =
  | "connect_failed"
  | "provider_error"
  | "disconnected"
  | "internal";

export type SnapshotReadResult =
  | { ok: true; raw: string | null }
  | { ok: false; code: SnapshotErrorCode };

export type WebSocketLike = {
  addEventListener(
    type: SocketEventType,
    listener: (event: SocketEvent) => void,
  ): void;
  send(data: string): void;
  close(): void;
};

export type WebSocketFactory = (url: string) => WebSocketLike;

export type TimerApi = {
  setTimeout(callback: () => void, delay: number): ReturnType<typeof setTimeout>;
  clearTimeout(handle: ReturnType<typeof setTimeout>): void;
};

export class SnapshotReadCancelled extends Error {
  constructor() {
    super("Snapshot read cancelled");
    this.name = "SnapshotReadCancelled";
  }
}

export type ReadSnapshotOptions = {
  apiKey: string;
  signal?: AbortSignal;
  webSocketFactory?: WebSocketFactory;
  timer?: TimerApi;
  windowMs?: number;
};

function createNativeWebSocket(url: string): WebSocketLike {
  const socket = new globalThis.WebSocket(url);

  return {
    addEventListener(type, listener) {
      socket.addEventListener(type, listener as EventListener);
    },
    send(data) {
      socket.send(data);
    },
    close() {
      socket.close();
    },
  };
}

const defaultTimer: TimerApi = {
  setTimeout(callback, delay) {
    return setTimeout(callback, delay);
  },
  clearTimeout(handle) {
    clearTimeout(handle);
  },
};

function createSubscription(apiKey: string): string {
  return JSON.stringify({
    APIKey: apiKey,
    BoundingBoxes: BOUNDING_BOXES,
    FilterMessageTypes: FILTER_MESSAGE_TYPES,
  });
}

export function readAISStreamSnapshot({
  apiKey,
  signal,
  webSocketFactory = createNativeWebSocket,
  timer = defaultTimer,
  windowMs = DEFAULT_WINDOW_MS,
}: ReadSnapshotOptions): Promise<SnapshotReadResult> {
  return new Promise((resolve, reject) => {
    let socket: WebSocketLike | null = null;
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null;
    let settled = false;
    let cleanedUp = false;
    let subscribed = false;

    const cleanup = () => {
      if (cleanedUp) {
        return;
      }

      cleanedUp = true;

      if (timeoutHandle !== null) {
        timer.clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }

      if (socket !== null) {
        try {
          socket.close();
        } catch {
          // Cleanup must not replace the original result.
        }
        socket = null;
      }

      signal?.removeEventListener("abort", onAbort);
    };

    const finish = (result: SnapshotReadResult) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      resolve(result);
    };

    const cancel = () => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      reject(new SnapshotReadCancelled());
    };

    const onAbort = () => {
      cancel();
    };

    timeoutHandle = timer.setTimeout(() => {
      finish(
        subscribed
          ? { ok: true, raw: null }
          : { ok: false, code: "connect_failed" },
      );
    }, windowMs);

    signal?.addEventListener("abort", onAbort, { once: true });

    if (signal?.aborted) {
      cancel();
      return;
    }

    try {
      const createdSocket = webSocketFactory(AISSTREAM_URL);

      if (settled) {
        try {
          createdSocket.close();
        } catch {
          // Cancellation still owns cleanup if construction races with abort.
        }
        return;
      }

      socket = createdSocket;

      socket.addEventListener("open", () => {
        if (settled || socket === null) {
          return;
        }

        try {
          socket.send(createSubscription(apiKey));
          subscribed = true;
        } catch {
          finish({ ok: false, code: "connect_failed" });
        }
      });

      socket.addEventListener("message", (event) => {
        if (settled) {
          return;
        }

        if (!subscribed) {
          finish({ ok: false, code: "connect_failed" });
          return;
        }

        if (typeof event.data !== "string") {
          finish({ ok: false, code: "provider_error" });
          return;
        }

        finish({ ok: true, raw: event.data });
      });

      socket.addEventListener("error", () => {
        finish({
          ok: false,
          code: subscribed ? "provider_error" : "connect_failed",
        });
      });

      socket.addEventListener("close", () => {
        finish({
          ok: false,
          code: subscribed ? "disconnected" : "connect_failed",
        });
      });
    } catch {
      finish({ ok: false, code: "connect_failed" });
    }
  });
}

export { AISSTREAM_URL, DEFAULT_WINDOW_MS };

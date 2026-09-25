import { expect, test } from "@playwright/test";
import { GET } from "../app/api/snapshot/route";
import {
  collectSnapshot,
  SNAPSHOT_VESSEL_LIMIT,
  SNAPSHOT_WINDOW_MS,
  type SnapshotReaderStarter,
} from "../server/snapshot-collector";
import {
  AISSTREAM_URL,
  SnapshotReadCancelled,
  type SnapshotErrorCode,
  type SnapshotReaderHandle,
  type SnapshotReaderHandlers,
  type TimerApi,
  type WebSocketLike,
} from "../server/aisstream-reader";

class FakeTimer implements TimerApi {
  readonly delays: number[] = [];
  clearCount = 0;
  lastCallback: (() => void) | null = null;
  private callbacks = new Map<number, () => void>();
  private nextId = 0;

  setTimeout(callback: () => void, delay: number): ReturnType<typeof setTimeout> {
    const id = this.nextId++;
    this.delays.push(delay);
    this.lastCallback = callback;
    this.callbacks.set(id, callback);
    return id as unknown as ReturnType<typeof setTimeout>;
  }

  clearTimeout(handle: ReturnType<typeof setTimeout>): void {
    this.clearCount += 1;
    this.callbacks.delete(handle as unknown as number);
  }

  runNext(): void {
    const next = this.callbacks.entries().next();
    if (next.done) {
      throw new Error("No pending timer");
    }

    const [id, callback] = next.value;
    this.callbacks.delete(id);
    callback();
  }
}

class FakeReader implements SnapshotReaderHandle {
  stopCount = 0;

  constructor(private readonly handlers: SnapshotReaderHandlers) {}

  subscribed(): void {
    this.handlers.onSubscribed();
  }

  text(text: string): void {
    this.handlers.onText(text);
  }

  error(code: SnapshotErrorCode): void {
    this.handlers.onError(code);
  }

  stop(): void {
    this.stopCount += 1;
  }
}

const FIXED_NOW = "2026-09-24T12:01:00.000Z";

function positionReport({
  mmsi = "123456789",
  name = "Test vessel",
  timestamp = "2026-09-24 12:00:00.123456789 +0000 UTC",
  lat = 51.1,
  lon = 1.2,
}: {
  mmsi?: string;
  name?: string;
  timestamp?: string;
  lat?: number;
  lon?: number;
} = {}): string {
  return JSON.stringify({
    MessageType: "PositionReport",
    MetaData: {
      MMSI: mmsi,
      ShipName: name,
      latitude: lat,
      longitude: lon,
      time_utc: timestamp,
    },
    Message: {
      PositionReport: {
        Latitude: lat,
        Longitude: lon,
        Sog: 4.5,
        Cog: 90,
        TrueHeading: 91,
      },
    },
  });
}

function createAttempt(signal?: AbortSignal) {
  const timer = new FakeTimer();
  let reader: FakeReader | null = null;
  let startCount = 0;
  const startReader: SnapshotReaderStarter = (handlers) => {
    expect(timer.delays).toEqual([SNAPSHOT_WINDOW_MS]);
    startCount += 1;
    reader = new FakeReader(handlers);
    return reader;
  };

  const promise = collectSnapshot({
    apiKey: "test-key",
    signal,
    startReader,
    timer,
    now: () => new Date(FIXED_NOW),
  });

  return {
    promise,
    timer,
    get reader() {
      if (reader === null) {
        throw new Error("Reader was not started");
      }
      return reader;
    },
    getStartCount: () => startCount,
  };
}

test("starts deadline before reader and maps a pre-subscription timeout", async () => {
  const attempt = createAttempt();

  expect(attempt.getStartCount()).toBe(1);
  expect(attempt.timer.delays).toEqual([15_000]);
  attempt.timer.runNext();

  await expect(attempt.promise).resolves.toEqual({
    ok: false,
    code: "connect_failed",
  });
  expect(attempt.reader.stopCount).toBe(1);
  expect(attempt.timer.clearCount).toBe(1);
});

test("returns an empty successful snapshot when the subscribed window expires", async () => {
  const attempt = createAttempt();
  attempt.reader.subscribed();
  attempt.timer.runNext();

  await expect(attempt.promise).resolves.toEqual({
    ok: true,
    vessels: [],
    collectedAt: FIXED_NOW,
    windowSeconds: 15,
    count: 0,
    truncated: false,
    reason: "window_elapsed",
  });
  expect(attempt.reader.stopCount).toBe(1);
  expect(attempt.timer.clearCount).toBe(1);
});

test("keeps the latest whole vessel and retains the first equal-timestamp report", async () => {
  const attempt = createAttempt();
  attempt.reader.subscribed();
  attempt.reader.text(positionReport({
    name: "first",
    timestamp: "2026-09-24 12:00:00.1119 +0000 UTC",
    lat: 50.9,
    lon: 1.1,
  }));
  attempt.reader.text(positionReport({
    name: "newest",
    timestamp: "2026-09-24 12:00:00.112 +0000 UTC",
    lat: 51.2,
    lon: 1.8,
  }));
  attempt.reader.text(positionReport({
    name: "older",
    timestamp: "2026-09-24 12:00:00.110 +0000 UTC",
    lat: 50.8,
    lon: 1.0,
  }));
  attempt.reader.text(positionReport({
    name: "equal-but-later",
    timestamp: "2026-09-24 12:00:00.1129 +0000 UTC",
    lat: 51.3,
    lon: 1.9,
  }));
  attempt.timer.runNext();

  await expect(attempt.promise).resolves.toEqual({
    ok: true,
    vessels: [{
      id: "123456789",
      name: "newest",
      lat: 51.2,
      lon: 1.8,
      speedKnots: 4.5,
      courseDeg: 90,
      timestamp: "2026-09-24T12:00:00.112Z",
      source: "aisstream",
    }],
    collectedAt: FIXED_NOW,
    windowSeconds: 15,
    count: 1,
    truncated: false,
    reason: "window_elapsed",
  });
});

test("ignores reports rejected by the transformer", async () => {
  const attempt = createAttempt();
  attempt.reader.subscribed();
  attempt.reader.text(JSON.stringify({ MessageType: "Other" }));
  attempt.reader.text(positionReport({ lat: 91 }));
  attempt.timer.runNext();

  await expect(attempt.promise).resolves.toMatchObject({
    ok: true,
    vessels: [],
    count: 0,
    reason: "window_elapsed",
  });
});

test("duplicate messages do not consume the unique-vessel limit", async () => {
  const attempt = createAttempt();
  attempt.reader.subscribed();

  for (let index = 0; index < SNAPSHOT_VESSEL_LIMIT; index += 1) {
    attempt.reader.text(positionReport({ mmsi: "123456789" }));
  }

  attempt.timer.runNext();
  await expect(attempt.promise).resolves.toMatchObject({
    ok: true,
    count: 1,
    truncated: false,
    reason: "window_elapsed",
  });
  expect(attempt.reader.stopCount).toBe(1);
  expect(attempt.timer.clearCount).toBe(1);
});

test("stops at exactly 100 unique valid vessels", async () => {
  const attempt = createAttempt();
  attempt.reader.subscribed();

  for (let index = 0; index < SNAPSHOT_VESSEL_LIMIT; index += 1) {
    attempt.reader.text(positionReport({ mmsi: String(100000000 + index) }));
  }
  attempt.reader.text(positionReport({ mmsi: "999999999" }));

  const result = await attempt.promise;
  expect(result).toMatchObject({
    ok: true,
    count: SNAPSHOT_VESSEL_LIMIT,
    vessels: expect.arrayContaining([
      expect.objectContaining({ id: "100000000" }),
      expect.objectContaining({ id: "100000099" }),
    ]),
    truncated: true,
    reason: "limit_reached",
  });
  expect(result.ok && result.vessels).toHaveLength(SNAPSHOT_VESSEL_LIMIT);
  expect(attempt.reader.stopCount).toBe(1);
  expect(attempt.timer.clearCount).toBe(1);
});

test("fails malformed JSON without exposing a partial snapshot", async () => {
  const attempt = createAttempt();
  attempt.reader.subscribed();
  attempt.reader.text(positionReport());
  attempt.reader.text("not json");

  await expect(attempt.promise).resolves.toEqual({
    ok: false,
    code: "provider_error",
  });
  expect(attempt.reader.stopCount).toBe(1);
  expect(attempt.timer.clearCount).toBe(1);
});

test("discards collected vessels on provider errors and disconnects", async () => {
  for (const code of ["provider_error", "disconnected", "internal"] as const) {
    const attempt = createAttempt();
    attempt.reader.subscribed();
    attempt.reader.text(positionReport());
    attempt.reader.error(code);

    await expect(attempt.promise).resolves.toEqual({ ok: false, code });
    expect(attempt.reader.stopCount).toBe(1);
    expect(attempt.timer.clearCount).toBe(1);
  }
});

test("cancels without partial success and ignores late events", async () => {
  const controller = new AbortController();
  const attempt = createAttempt(controller.signal);
  attempt.reader.subscribed();
  attempt.reader.text(positionReport());
  controller.abort();

  await expect(attempt.promise).rejects.toBeInstanceOf(SnapshotReadCancelled);
  expect(attempt.reader.stopCount).toBe(1);
  expect(attempt.timer.clearCount).toBe(1);

  attempt.reader.text(positionReport({ mmsi: "222222222" }));
  attempt.reader.error("provider_error");
  expect(attempt.reader.stopCount).toBe(1);
});

test("settles and cleans up once when terminal events arrive late or repeatedly", async () => {
  const attempt = createAttempt();
  attempt.reader.subscribed();
  attempt.reader.text(positionReport());
  attempt.timer.runNext();
  const settled = await attempt.promise;

  attempt.timer.lastCallback?.();
  attempt.reader.error("provider_error");
  attempt.reader.text(positionReport({ mmsi: "222222222" }));

  expect(settled).toMatchObject({ ok: true, count: 1, reason: "window_elapsed" });
  expect(attempt.reader.stopCount).toBe(1);
  expect(attempt.timer.clearCount).toBe(1);
});

class RouteWebSocket implements WebSocketLike {
  binaryType: "blob" | "arraybuffer" = "blob";
  private listeners = new Map<string, ((event: { data?: unknown }) => void)[]>();

  constructor(url: string) {
    expect(url).toBe(AISSTREAM_URL);
    queueMicrotask(() => this.emit("open"));
  }

  addEventListener(
    type: "open" | "message" | "error" | "close",
    listener: (event: { data?: unknown }) => void,
  ): void {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  send(data: string): void {
    expect(JSON.parse(data)).toMatchObject({
      APIKey: "test-key",
      FilterMessageTypes: ["PositionReport"],
    });
    expect(this.binaryType).toBe("arraybuffer");
    queueMicrotask(() => {
      for (let index = 0; index < SNAPSHOT_VESSEL_LIMIT; index += 1) {
        const report = positionReport({ mmsi: String(200000000 + index) });
        const data = index === 0
          ? new TextEncoder().encode(report).buffer
          : report;
        this.emit("message", { data });
      }
    });
  }

  close(): void {}

  protected emit(type: string, event: { data?: unknown } = {}): void {
    for (const listener of this.listeners.get(type) ?? []) {
      listener(event);
    }
  }
}

class RouteErrorWebSocket extends RouteWebSocket {
  override send(data: string): void {
    expect(JSON.parse(data)).toMatchObject({
      APIKey: "test-key",
      FilterMessageTypes: ["PositionReport"],
    });
    queueMicrotask(() => {
      this.emit("message", { data: positionReport() });
      this.emit("error");
    });
  }
}

test("route returns the final B-12 success envelope", async () => {
  const previousDescriptor = Object.getOwnPropertyDescriptor(globalThis, "WebSocket");
  Object.defineProperty(globalThis, "WebSocket", {
    configurable: true,
    writable: true,
    value: RouteWebSocket,
  });
  process.env.AISSTREAM_API_KEY = "test-key";

  try {
    const response = await GET(new Request("http://127.0.0.1/api/snapshot"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      ok: true,
      count: SNAPSHOT_VESSEL_LIMIT,
      windowSeconds: 15,
      truncated: true,
      reason: "limit_reached",
    });
    expect(body.vessels).toHaveLength(SNAPSHOT_VESSEL_LIMIT);
    expect(Object.keys(body).sort()).toEqual([
      "collectedAt",
      "count",
      "ok",
      "reason",
      "truncated",
      "vessels",
      "windowSeconds",
    ].sort());
    expect(body).not.toHaveProperty("raw");
    expect(body).not.toHaveProperty("attemptedAt");
  } finally {
    process.env.AISSTREAM_API_KEY = "";
    if (previousDescriptor === undefined) {
      delete (globalThis as { WebSocket?: typeof WebSocket }).WebSocket;
    } else {
      Object.defineProperty(globalThis, "WebSocket", previousDescriptor);
    }
  }
});

test("route maps provider failure after partial input to the fixed 502 envelope", async () => {
  const previousDescriptor = Object.getOwnPropertyDescriptor(globalThis, "WebSocket");
  Object.defineProperty(globalThis, "WebSocket", {
    configurable: true,
    writable: true,
    value: RouteErrorWebSocket,
  });
  process.env.AISSTREAM_API_KEY = "test-key";

  try {
    const response = await GET(new Request("http://127.0.0.1/api/snapshot"));
    const body = await response.json();

    expect(response.status).toBe(502);
    expect(body).toMatchObject({
      ok: false,
      error: {
        code: "provider_error",
        message: "Джерело повернуло помилку",
      },
    });
    expect(body).toHaveProperty("attemptedAt");
    expect(body).not.toHaveProperty("vessels");
    expect(body).not.toHaveProperty("raw");
  } finally {
    process.env.AISSTREAM_API_KEY = "";
    if (previousDescriptor === undefined) {
      Reflect.deleteProperty(globalThis, "WebSocket");
    } else {
      Object.defineProperty(globalThis, "WebSocket", previousDescriptor);
    }
  }
});

import { expect, test } from "@playwright/test";
import { GET } from "../app/api/snapshot/route";
import {
  AISSTREAM_URL,
  readAISStreamSnapshot,
  SnapshotReadCancelled,
  type TimerApi,
  type WebSocketLike,
} from "../server/aisstream-reader";

type Listener = (event: { data?: unknown }) => void;

type SocketEvent = "open" | "message" | "error" | "close";

class FakeWebSocket implements WebSocketLike {
  readonly sent: string[] = [];
  closeCount = 0;
  private readonly listeners = new Map<SocketEvent, Listener[]>();

  addEventListener(type: SocketEvent, listener: Listener): void {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  send(data: string): void {
    this.sent.push(data);
  }

  close(): void {
    this.closeCount += 1;
  }

  emit(type: SocketEvent, event: { data?: unknown } = {}): void {
    for (const listener of this.listeners.get(type) ?? []) {
      listener(event);
    }
  }
}

class FakeTimer implements TimerApi {
  readonly delays: number[] = [];
  clearCount = 0;
  private readonly callbacks = new Map<number, () => void>();
  private nextId = 0;

  setTimeout(callback: () => void, delay: number): ReturnType<typeof setTimeout> {
    const id = this.nextId++;
    this.delays.push(delay);
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

function createAttempt() {
  const socket = new FakeWebSocket();
  const timer = new FakeTimer();
  let factoryCalls = 0;

  const promise = readAISStreamSnapshot({
    apiKey: "test-key",
    timer,
    webSocketFactory: (url) => {
      factoryCalls += 1;
      expect(timer.delays).toEqual([15_000]);
      expect(url).toBe(AISSTREAM_URL);
      return socket;
    },
  });

  return { promise, socket, timer, getFactoryCalls: () => factoryCalls };
}

test("returns the first text message and sends the exact subscription immediately", async () => {
  const attempt = createAttempt();

  expect(attempt.getFactoryCalls()).toBe(1);
  expect(attempt.socket.sent).toEqual([]);

  attempt.socket.emit("open");

  expect(attempt.socket.sent).toHaveLength(1);
  expect(JSON.parse(attempt.socket.sent[0])).toEqual({
    APIKey: "test-key",
    BoundingBoxes: [[[50.75, 0.95], [51.25, 1.95]]],
    FilterMessageTypes: ["PositionReport"],
  });

  attempt.socket.emit("message", { data: '{"MessageType":"PositionReport"}' });

  await expect(attempt.promise).resolves.toEqual({
    ok: true,
    raw: '{"MessageType":"PositionReport"}',
  });
  expect(attempt.socket.closeCount).toBe(1);
  expect(attempt.timer.clearCount).toBe(1);
});

test("starts the total deadline before connection and maps a pre-open timeout", async () => {
  const attempt = createAttempt();

  expect(attempt.timer.delays).toEqual([15_000]);
  attempt.timer.runNext();

  await expect(attempt.promise).resolves.toEqual({
    ok: false,
    code: "connect_failed",
  });
  expect(attempt.socket.closeCount).toBe(1);
  expect(attempt.timer.clearCount).toBe(1);
});

test("returns raw null after an opened subscription reaches the deadline", async () => {
  const attempt = createAttempt();

  attempt.socket.emit("open");
  attempt.timer.runNext();

  await expect(attempt.promise).resolves.toEqual({ ok: true, raw: null });
  expect(attempt.socket.closeCount).toBe(1);
  expect(attempt.timer.clearCount).toBe(1);
});

test("maps connection, provider, disconnect and binary-message failures", async () => {
  const beforeOpen = createAttempt();
  beforeOpen.socket.emit("error");
  await expect(beforeOpen.promise).resolves.toEqual({
    ok: false,
    code: "connect_failed",
  });

  const provider = createAttempt();
  provider.socket.emit("open");
  provider.socket.emit("error");
  await expect(provider.promise).resolves.toEqual({
    ok: false,
    code: "provider_error",
  });

  const disconnected = createAttempt();
  disconnected.socket.emit("open");
  disconnected.socket.emit("close");
  await expect(disconnected.promise).resolves.toEqual({
    ok: false,
    code: "disconnected",
  });

  const binary = createAttempt();
  binary.socket.emit("open");
  binary.socket.emit("message", { data: new ArrayBuffer(0) });
  await expect(binary.promise).resolves.toEqual({
    ok: false,
    code: "provider_error",
  });
});

test("cancels with cleanup-only semantics and ignores late events", async () => {
  const controller = new AbortController();
  const socket = new FakeWebSocket();
  const timer = new FakeTimer();
  const promise = readAISStreamSnapshot({
    apiKey: "test-key",
    signal: controller.signal,
    timer,
    webSocketFactory: () => socket,
  });

  controller.abort();

  await expect(promise).rejects.toBeInstanceOf(SnapshotReadCancelled);
  expect(socket.closeCount).toBe(1);
  expect(timer.clearCount).toBe(1);

  socket.emit("open");
  socket.emit("message", { data: "late" });
  expect(socket.sent).toEqual([]);
});

test("closes a socket created during an abort race", async () => {
  const controller = new AbortController();
  const socket = new FakeWebSocket();
  const timer = new FakeTimer();
  const promise = readAISStreamSnapshot({
    apiKey: "test-key",
    signal: controller.signal,
    timer,
    webSocketFactory: () => {
      controller.abort();
      return socket;
    },
  });

  await expect(promise).rejects.toBeInstanceOf(SnapshotReadCancelled);
  expect(socket.closeCount).toBe(1);
  expect(timer.clearCount).toBe(1);
});

test("does not open a socket when the API key is blank", async () => {
  process.env.AISSTREAM_API_KEY = "";

  const response = await GET(new Request("http://127.0.0.1/api/snapshot"));
  const body = await response.json();

  expect(response.status).toBe(502);
  expect(body).toMatchObject({
    ok: false,
    error: {
      code: "no_api_key",
      message: "Ключ AISStream не налаштовано",
    },
  });
});

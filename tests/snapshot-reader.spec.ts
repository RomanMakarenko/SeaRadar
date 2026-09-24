import { expect, test } from "@playwright/test";
import { GET } from "../app/api/snapshot/route";
import {
  AISSTREAM_URL,
  startAISStreamReader,
  type SnapshotErrorCode,
  type SnapshotReaderHandlers,
  type WebSocketLike,
} from "../server/aisstream-reader";

type Listener = (event: { data?: unknown }) => void;

type SocketEvent = "open" | "message" | "error" | "close";

class FakeWebSocket implements WebSocketLike {
  readonly sent: string[] = [];
  closeCount = 0;
  sendError: Error | null = null;
  private readonly listeners = new Map<SocketEvent, Listener[]>();

  addEventListener(type: SocketEvent, listener: Listener): void {
    const listeners = this.listeners.get(type) ?? [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  send(data: string): void {
    if (this.sendError !== null) {
      throw this.sendError;
    }
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

function createAttempt() {
  const socket = new FakeWebSocket();
  const messages: string[] = [];
  const errors: SnapshotErrorCode[] = [];
  let factoryCalls = 0;
  let subscribedCount = 0;

  const handlers: SnapshotReaderHandlers = {
    onSubscribed() {
      subscribedCount += 1;
    },
    onText(text) {
      messages.push(text);
    },
    onError(code) {
      errors.push(code);
    },
  };

  const reader = startAISStreamReader(
    {
      apiKey: "test-key",
      webSocketFactory: (url) => {
        factoryCalls += 1;
        expect(url).toBe(AISSTREAM_URL);
        return socket;
      },
    },
    handlers,
  );

  return {
    reader,
    socket,
    messages,
    errors,
    getFactoryCalls: () => factoryCalls,
    getSubscribedCount: () => subscribedCount,
  };
}

test("forwards ordered text messages from one socket and sends the exact subscription", () => {
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
  expect(attempt.getSubscribedCount()).toBe(1);

  attempt.socket.emit("message", { data: "first" });
  expect(attempt.socket.closeCount).toBe(0);
  attempt.socket.emit("message", { data: "second" });

  expect(attempt.messages).toEqual(["first", "second"]);
  expect(attempt.getFactoryCalls()).toBe(1);
  expect(attempt.socket.closeCount).toBe(0);

  attempt.reader.stop();
  attempt.reader.stop();
  expect(attempt.socket.closeCount).toBe(1);

  attempt.socket.emit("message", { data: "late" });
  expect(attempt.messages).toEqual(["first", "second"]);
});

test("maps setup, provider, disconnect and binary-message failures", () => {
  const beforeOpen = createAttempt();
  beforeOpen.socket.emit("error");
  beforeOpen.socket.emit("close");
  expect(beforeOpen.errors).toEqual(["connect_failed"]);
  expect(beforeOpen.socket.closeCount).toBe(1);

  const messageBeforeOpen = createAttempt();
  messageBeforeOpen.socket.emit("message", { data: "unexpected" });
  expect(messageBeforeOpen.errors).toEqual(["connect_failed"]);

  const provider = createAttempt();
  provider.socket.emit("open");
  provider.socket.emit("error");
  expect(provider.errors).toEqual(["provider_error"]);
  expect(provider.socket.closeCount).toBe(1);

  const disconnected = createAttempt();
  disconnected.socket.emit("open");
  disconnected.socket.emit("close");
  expect(disconnected.errors).toEqual(["disconnected"]);
  expect(disconnected.socket.closeCount).toBe(1);

  const binary = createAttempt();
  binary.socket.emit("open");
  binary.socket.emit("message", { data: new ArrayBuffer(0) });
  expect(binary.errors).toEqual(["provider_error"]);
  expect(binary.socket.closeCount).toBe(1);
});

test("maps a failed subscription send to connect_failed", () => {
  const attempt = createAttempt();
  attempt.socket.sendError = new Error("private socket detail");
  attempt.socket.emit("open");

  expect(attempt.errors).toEqual(["connect_failed"]);
  expect(attempt.socket.closeCount).toBe(1);
});

test("maps socket construction failure to connect_failed", () => {
  const errors: SnapshotErrorCode[] = [];
  const reader = startAISStreamReader(
    {
      apiKey: "test-key",
      webSocketFactory() {
        throw new Error("private socket detail");
      },
    },
    {
      onSubscribed() {},
      onText() {},
      onError(code) {
        errors.push(code);
      },
    },
  );

  expect(errors).toEqual(["connect_failed"]);
  expect(() => reader.stop()).not.toThrow();
});

test("does not construct a socket when the API key is blank", async () => {
  const previousDescriptor = Object.getOwnPropertyDescriptor(globalThis, "WebSocket");
  let socketConstructionCount = 0;
  Object.defineProperty(globalThis, "WebSocket", {
    configurable: true,
    writable: true,
    value: class {
      constructor() {
        socketConstructionCount += 1;
      }
    },
  });
  process.env.AISSTREAM_API_KEY = "";

  try {
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
    expect(socketConstructionCount).toBe(0);
  } finally {
    if (previousDescriptor === undefined) {
      Reflect.deleteProperty(globalThis, "WebSocket");
    } else {
      Object.defineProperty(globalThis, "WebSocket", previousDescriptor);
    }
  }
});

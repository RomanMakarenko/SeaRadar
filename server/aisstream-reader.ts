const AISSTREAM_URL = "wss://stream.aisstream.io/v0/stream";
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

export type SnapshotReaderHandlers = {
  onSubscribed(): void;
  onText(text: string): void;
  onError(code: SnapshotErrorCode): void;
};

export type SnapshotReaderHandle = {
  stop(): void;
};

export type StartSnapshotReaderOptions = {
  apiKey: string;
  webSocketFactory?: WebSocketFactory;
};

function createNativeWebSocket(url: string): WebSocketLike {
  const socket = new globalThis.WebSocket(url);
  socket.binaryType = "arraybuffer";

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

function createSubscription(apiKey: string): string {
  return JSON.stringify({
    APIKey: apiKey,
    BoundingBoxes: BOUNDING_BOXES,
    FilterMessageTypes: FILTER_MESSAGE_TYPES,
  });
}

function decodeMessageData(data: unknown): string | null {
  if (typeof data === "string") {
    return data;
  }

  if (!(data instanceof ArrayBuffer)) {
    return null;
  }

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(data);
  } catch {
    return null;
  }
}

export function startAISStreamReader(
  { apiKey, webSocketFactory = createNativeWebSocket }: StartSnapshotReaderOptions,
  handlers: SnapshotReaderHandlers,
): SnapshotReaderHandle {
  let socket: WebSocketLike | null = null;
  let active = true;
  let cleanedUp = false;
  let subscribed = false;

  const cleanup = () => {
    if (cleanedUp) {
      return;
    }

    cleanedUp = true;
    const currentSocket = socket;
    socket = null;

    if (currentSocket !== null) {
      try {
        currentSocket.close();
      } catch {
        // Cleanup must not replace the original result.
      }
    }
  };

  const stop = () => {
    if (!active) {
      return;
    }

    active = false;
    cleanup();
  };

  const fail = (code: SnapshotErrorCode) => {
    if (!active) {
      return;
    }

    active = false;
    cleanup();

    try {
      handlers.onError(code);
    } catch {
      // An observer must not restart or alter a settled reader.
    }
  };

  try {
    socket = webSocketFactory(AISSTREAM_URL);

    socket.addEventListener("open", () => {
      if (!active || socket === null || subscribed) {
        return;
      }

      try {
        socket.send(createSubscription(apiKey));
        subscribed = true;
      } catch {
        fail("connect_failed");
        return;
      }

      try {
        handlers.onSubscribed();
      } catch {
        fail("internal");
      }
    });

    socket.addEventListener("message", (event) => {
      if (!active) {
        return;
      }

      if (!subscribed) {
        fail("connect_failed");
        return;
      }

      const text = decodeMessageData(event.data);
      if (text === null) {
        fail("provider_error");
        return;
      }

      try {
        handlers.onText(text);
      } catch {
        fail("internal");
      }
    });

    socket.addEventListener("error", () => {
      fail(subscribed ? "provider_error" : "connect_failed");
    });

    socket.addEventListener("close", () => {
      fail(subscribed ? "disconnected" : "connect_failed");
    });
  } catch {
    fail("connect_failed");
  }

  return { stop };
}

export { AISSTREAM_URL };

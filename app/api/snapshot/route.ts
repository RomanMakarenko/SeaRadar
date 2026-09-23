import { getAISStreamApiKey } from "../../../server/aisstream-config";
import {
  readAISStreamSnapshot,
  SnapshotReadCancelled,
  type SnapshotErrorCode,
} from "../../../server/aisstream-reader";

export const runtime = "nodejs";

const ERROR_MESSAGES: Record<SnapshotErrorCode, string> = {
  connect_failed: "Не вдалося підключитися до джерела",
  provider_error: "Джерело повернуло помилку",
  disconnected: "З'єднання з джерелом розірвано",
  internal: "Внутрішня помилка сервера",
};

function errorResponse(
  attemptedAt: string,
  code: SnapshotErrorCode | "no_api_key",
): Response {
  const message =
    code === "no_api_key"
      ? "Ключ AISStream не налаштовано"
      : ERROR_MESSAGES[code];

  return Response.json(
    {
      ok: false,
      attemptedAt,
      error: { code, message },
    },
    { status: 502 },
  );
}

export async function GET(request: Request): Promise<Response> {
  const attemptedAt = new Date().toISOString();
  const apiKey = getAISStreamApiKey();

  if (apiKey === null) {
    return errorResponse(attemptedAt, "no_api_key");
  }

  try {
    const result = await readAISStreamSnapshot({
      apiKey,
      signal: request.signal,
    });

    if (!result.ok) {
      return errorResponse(attemptedAt, result.code);
    }

    return Response.json({
      ok: true,
      raw: result.raw,
      collectedAt: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof SnapshotReadCancelled || request.signal.aborted) {
      throw error;
    }

    return errorResponse(attemptedAt, "internal");
  }
}

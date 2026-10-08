"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState } from "react";
import VesselCard from "./vessel-card";
import { DEMO_VESSELS } from "./vessel-model";
import type { Vessel } from "./vessel-model";

type SnapshotSuccess = {
  ok: true;
  vessels: Vessel[];
  collectedAt: string;
  windowSeconds: 15;
  count: number;
  truncated: boolean;
  reason: "window_elapsed" | "limit_reached";
};

type DisplayedState =
  | { kind: "demo" }
  | { kind: "snapshot"; snapshot: SnapshotSuccess };

type SnapshotAttempt =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; message: string }
  | { kind: "empty"; message: string }
  | { kind: "error"; message: string };

type MapMode = "demo" | "snapshot";

const NO_RESPONSE_MESSAGE =
  "Спроба: не вдалося отримати дані: Немає відповіді сервера";
const NO_VESSELS: Vessel[] = [];
const ERROR_MESSAGES = {
  no_api_key: "Ключ AISStream не налаштовано",
  connect_failed: "Не вдалося підключитися до джерела",
  provider_error: "Джерело повернуло помилку",
  disconnected: "З'єднання з джерелом розірвано",
  internal: "Внутрішня помилка сервера",
} as const;

const SeaMap = dynamic(() => import("./sea-map"), {
  ssr: false,
  loading: () => <div className="sea-map" aria-label="Завантаження карти Дуврської протоки" />,
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function parseVessel(value: unknown): Vessel | null {
  if (!isRecord(value)) {
    return null;
  }

  const { id, name, lat, lon, speedKnots, courseDeg, timestamp, source } = value;
  if (
    typeof id !== "string" ||
    id.length === 0 ||
    !(typeof name === "string" || name === null) ||
    !isFiniteNumber(lat) ||
    lat < -90 ||
    lat > 90 ||
    !isFiniteNumber(lon) ||
    lon < -180 ||
    lon > 180 ||
    !(speedKnots === null || isFiniteNumber(speedKnots)) ||
    (typeof speedKnots === "number" && (speedKnots < 0 || speedKnots > 102.2)) ||
    !(courseDeg === null || isFiniteNumber(courseDeg)) ||
    (typeof courseDeg === "number" && (courseDeg < 0 || courseDeg >= 360)) ||
    typeof timestamp !== "string" ||
    !Number.isFinite(Date.parse(timestamp)) ||
    source !== "aisstream"
  ) {
    return null;
  }

  return { id, name, lat, lon, speedKnots, courseDeg, timestamp, source };
}

function parseSnapshotSuccess(value: unknown): SnapshotSuccess | null {
  if (!isRecord(value) || value.ok !== true || !Array.isArray(value.vessels)) {
    return null;
  }

  const vessels = value.vessels.map(parseVessel);
  const { collectedAt, windowSeconds, count, truncated, reason } = value;
  if (
    vessels.some((vessel) => vessel === null) ||
    new Set(vessels.map((vessel) => vessel?.id)).size !== vessels.length ||
    typeof collectedAt !== "string" ||
    !Number.isFinite(Date.parse(collectedAt)) ||
    windowSeconds !== 15 ||
    !Number.isInteger(count) ||
    count !== vessels.length ||
    count > 100 ||
    typeof truncated !== "boolean" ||
    (reason !== "window_elapsed" && reason !== "limit_reached") ||
    truncated !== (reason === "limit_reached") ||
    (reason === "limit_reached" && count !== 100)
  ) {
    return null;
  }

  return {
    ok: true,
    vessels: vessels as Vessel[],
    collectedAt,
    windowSeconds: 15,
    count,
    truncated,
    reason,
  };
}

function parseSnapshotError(value: unknown): { attemptedAt: string; message: string } | null {
  if (!isRecord(value) || value.ok !== false || !isRecord(value.error)) {
    return null;
  }

  const { attemptedAt } = value;
  const { code, message } = value.error;
  if (
    typeof attemptedAt !== "string" ||
    !Number.isFinite(Date.parse(attemptedAt)) ||
    typeof code !== "string" ||
    !(code in ERROR_MESSAGES) ||
    message !== ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES]
  ) {
    return null;
  }

  return {
    attemptedAt,
    message: ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES],
  };
}

function formatSnapshotTime(value: string): string {
  return new Date(value).toISOString().slice(11, 19);
}

function getSnapshotLabel(snapshot: SnapshotSuccess): string {
  const label = `AISStream · знімок за ${snapshot.windowSeconds} с · отримано ${formatSnapshotTime(snapshot.collectedAt)} UTC · суден: ${snapshot.count} · вибірка неповна`;
  return snapshot.truncated ? `${label} · зупинено на ліміті 100` : label;
}

export default function MapShell() {
  const [displayed, setDisplayed] = useState<DisplayedState>({ kind: "demo" });
  const [attempt, setAttempt] = useState<SnapshotAttempt>({ kind: "idle" });
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [viewResetToken, setViewResetToken] = useState(0);
  const inFlightRef = useRef(false);
  const hasResetForSnapshotRef = useRef(false);

  const handleVesselSelect = useCallback((vessel: Vessel) => {
    setSelectedVessel((currentVessel) =>
      currentVessel?.id === vessel.id ? currentVessel : vessel,
    );
  }, []);
  const handleVesselUpdate = useCallback((vessel: Vessel) => {
    setSelectedVessel((currentVessel) =>
      currentVessel?.id === vessel.id ? vessel : currentVessel,
    );
  }, []);

  const loadSnapshot = useCallback(async () => {
    if (inFlightRef.current) {
      return;
    }

    inFlightRef.current = true;
    setAttempt({ kind: "loading" });

    try {
      const response = await fetch("/api/snapshot", { method: "GET" });
      const payload: unknown = await response.json();

      if (response.status === 502) {
        const error = parseSnapshotError(payload);
        setAttempt({
          kind: "error",
          message:
            error === null
              ? NO_RESPONSE_MESSAGE
              : `Спроба ${formatSnapshotTime(error.attemptedAt)} UTC: не вдалося отримати дані: ${error.message}`,
        });
        return;
      }

      if (!response.ok) {
        setAttempt({ kind: "error", message: NO_RESPONSE_MESSAGE });
        return;
      }

      const snapshot = parseSnapshotSuccess(payload);
      if (snapshot === null) {
        setAttempt({ kind: "error", message: NO_RESPONSE_MESSAGE });
        return;
      }

      if (snapshot.vessels.length === 0) {
        setAttempt({
          kind: "empty",
          message: `Спроба ${formatSnapshotTime(snapshot.collectedAt)} UTC: за час збору позицій не отримано`,
        });
        return;
      }

      if (!hasResetForSnapshotRef.current) {
        hasResetForSnapshotRef.current = true;
        setViewResetToken((token) => token + 1);
      }
      setDisplayed({ kind: "snapshot", snapshot });
      setAttempt({
        kind: "success",
        message: `Спроба ${formatSnapshotTime(snapshot.collectedAt)} UTC: отримано суден: ${snapshot.count}`,
      });
      setSelectedVessel((currentVessel) =>
        currentVessel === null
          ? null
          : snapshot.vessels.find((vessel) => vessel.id === currentVessel.id) ?? null,
      );
    } catch {
      setAttempt({ kind: "error", message: NO_RESPONSE_MESSAGE });
    } finally {
      inFlightRef.current = false;
    }
  }, []);

  const snapshot = displayed.kind === "snapshot" ? displayed.snapshot : null;
  const mapMode: MapMode = snapshot === null ? "demo" : "snapshot";
  const mapVessels = useMemo(() => {
    if (snapshot === null) {
      return NO_VESSELS;
    }

    return snapshot.vessels.length < 3
      ? [...snapshot.vessels, ...DEMO_VESSELS]
      : snapshot.vessels;
  }, [snapshot]);
  const sourceLabel =
    snapshot === null ? "Демонстраційні дані" : getSnapshotLabel(snapshot);
  const attemptMessage =
    attempt.kind === "idle"
      ? null
      : attempt.kind === "loading"
        ? "Завантаження…"
        : attempt.message;
  const source = snapshot === null ? "demo" : "aisstream";

  return (
    <div className="sea-map-shell">
      <SeaMap
        mode={mapMode}
        vessels={mapVessels}
        selectedVesselId={selectedVessel?.id ?? null}
        viewResetToken={viewResetToken}
        onVesselSelect={handleVesselSelect}
        onVesselUpdate={handleVesselUpdate}
      />
      <div className="map-panel">
        <button
          type="button"
          className="future-data-button"
          onClick={loadSnapshot}
          disabled={attempt.kind === "loading"}
        >
          Завантажити справжні позиції
        </button>
        <div className="map-source-label" data-source={source} aria-live="polite">
          {sourceLabel}
        </div>
        {attemptMessage ? (
          <div className="map-error-message" role="status" aria-live="polite">
            {attemptMessage}
          </div>
        ) : null}
        <div className="map-source-label">
          Після оновлення сторінки знову показуються демонстраційні дані
        </div>
        {selectedVessel ? <VesselCard vessel={selectedVessel} /> : null}
      </div>
    </div>
  );
}

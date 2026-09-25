"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import VesselCard from "./vessel-card";
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

type SnapshotUiState =
  | { kind: "idle-demo" }
  | { kind: "loading" }
  | { kind: "success"; snapshot: SnapshotSuccess }
  | { kind: "empty"; snapshot: SnapshotSuccess }
  | { kind: "error"; message: string };

type MapMode = "demo" | "hidden" | "snapshot";

const SNAPSHOT_FALLBACK =
  "Не вдалося отримати дані: Сервіс не повернув коректну відповідь";
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

function parseSnapshotError(value: unknown): string | null {
  if (!isRecord(value) || value.ok !== false || !isRecord(value.error)) {
    return null;
  }

  const { code, message } = value.error;
  if (
    typeof code !== "string" ||
    !(code in ERROR_MESSAGES) ||
    message !== ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES]
  ) {
    return null;
  }

  return ERROR_MESSAGES[code as keyof typeof ERROR_MESSAGES];
}

function formatSnapshotTime(value: string): string {
  return new Date(value).toISOString().slice(11, 19);
}

function getSnapshotLabel(snapshot: SnapshotSuccess): string {
  const label = `AISStream · знімок за ${snapshot.windowSeconds} с · отримано ${formatSnapshotTime(snapshot.collectedAt)} UTC · суден: ${snapshot.count} · вибірка неповна`;
  return snapshot.truncated ? `${label} · зупинено на ліміті 100` : label;
}

export default function MapShell() {
  const [state, setState] = useState<SnapshotUiState>({ kind: "idle-demo" });
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
    setSelectedVessel(null);
    setState({ kind: "loading" });

    try {
      const response = await fetch("/api/snapshot", { method: "GET" });
      const payload: unknown = await response.json();

      if (response.status === 502) {
        const message = parseSnapshotError(payload);
        if (message === null) {
          setState({ kind: "error", message: SNAPSHOT_FALLBACK });
        } else {
          setState({ kind: "error", message: `Не вдалося отримати дані: ${message}` });
        }
        return;
      }

      if (!response.ok) {
        setState({ kind: "error", message: SNAPSHOT_FALLBACK });
        return;
      }

      const snapshot = parseSnapshotSuccess(payload);
      if (snapshot === null) {
        setState({ kind: "error", message: SNAPSHOT_FALLBACK });
        return;
      }

      if (snapshot.vessels.length === 0) {
        setState({ kind: "empty", snapshot });
        return;
      }

      if (!hasResetForSnapshotRef.current) {
        hasResetForSnapshotRef.current = true;
        setViewResetToken((token) => token + 1);
      }
      setState({ kind: "success", snapshot });
    } catch {
      setState({ kind: "error", message: SNAPSHOT_FALLBACK });
    } finally {
      inFlightRef.current = false;
    }
  }, []);

  const mapMode: MapMode =
    state.kind === "idle-demo"
      ? "demo"
      : state.kind === "success"
        ? "snapshot"
        : "hidden";
  const mapVessels = state.kind === "success" ? state.snapshot.vessels : NO_VESSELS;
  const sourceLabel =
    state.kind === "idle-demo"
      ? "Демонстраційні дані"
      : state.kind === "loading"
        ? "Завантаження…"
        : state.kind === "success" || state.kind === "empty"
          ? getSnapshotLabel(state.snapshot)
          : "Даних на карті немає";
  const errorMessage = state.kind === "error" ? state.message : null;
  const source =
    state.kind === "idle-demo"
      ? "demo"
      : state.kind === "loading"
        ? "loading"
        : state.kind === "success" || state.kind === "empty"
          ? "aisstream"
          : "none";

  return (
    <div className="sea-map-shell">
      <SeaMap
        mode={mapMode}
        vessels={mapVessels}
        viewResetToken={viewResetToken}
        onVesselSelect={handleVesselSelect}
        onVesselUpdate={handleVesselUpdate}
      />
      <div className="map-panel">
        <button
          type="button"
          className="future-data-button"
          onClick={loadSnapshot}
          disabled={state.kind === "loading"}
        >
          Завантажити справжні позиції
        </button>
        <div className="map-source-label" data-source={source} aria-live="polite">
          {sourceLabel}
        </div>
        {errorMessage ? (
          <div className="map-error-message" role="status" aria-live="polite">
            {errorMessage}
          </div>
        ) : null}
        {state.kind === "empty" ? (
          <div className="map-empty-message" role="status" aria-live="polite">
            За час збору позицій не отримано
          </div>
        ) : null}
        {selectedVessel ? <VesselCard vessel={selectedVessel} /> : null}
      </div>
    </div>
  );
}

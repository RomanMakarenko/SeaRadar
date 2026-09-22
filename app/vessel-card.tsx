import type { Vessel } from "./vessel-model";

const UNKNOWN_VALUE = "Немає даних";

function formatName(name: Vessel["name"]): string {
  return name === null || name.length === 0 ? UNKNOWN_VALUE : name;
}

function formatCoordinates(vessel: Vessel): string {
  if (!Number.isFinite(vessel.lat) || !Number.isFinite(vessel.lon)) {
    return UNKNOWN_VALUE;
  }

  return `${vessel.lat.toFixed(5)}, ${vessel.lon.toFixed(5)}`;
}

function formatSpeed(speedKnots: Vessel["speedKnots"]): string {
  if (speedKnots === null || !Number.isFinite(speedKnots)) {
    return UNKNOWN_VALUE;
  }

  const roundedSpeed = Math.round(speedKnots * 10) / 10;
  return `${roundedSpeed} kn`;
}

function formatCourse(courseDeg: Vessel["courseDeg"]): string {
  if (courseDeg === null || !Number.isFinite(courseDeg)) {
    return UNKNOWN_VALUE;
  }

  return `${Math.round(courseDeg) % 360}°`;
}

function formatTimestamp(timestamp: Vessel["timestamp"]): string {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return UNKNOWN_VALUE;
  }

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds} UTC`;
}

function formatSource(source: Vessel["source"]): string {
  if (source === "demo") {
    return "Демонстраційні дані";
  }

  if (source === "aisstream") {
    return "AISStream";
  }

  return UNKNOWN_VALUE;
}

interface VesselCardProps {
  vessel: Vessel;
}

export default function VesselCard({ vessel }: VesselCardProps) {
  return (
    <article className="vessel-card" data-vessel-card-id={vessel.id}>
      <h2>Дані судна</h2>
      <dl>
        <div>
          <dt>ID</dt>
          <dd>{vessel.id || UNKNOWN_VALUE}</dd>
        </div>
        <div>
          <dt>Назва</dt>
          <dd>{formatName(vessel.name)}</dd>
        </div>
        <div>
          <dt>Координати</dt>
          <dd>{formatCoordinates(vessel)}</dd>
        </div>
        <div>
          <dt>Швидкість</dt>
          <dd>{formatSpeed(vessel.speedKnots)}</dd>
        </div>
        <div>
          <dt>Курс</dt>
          <dd>{formatCourse(vessel.courseDeg)}</dd>
        </div>
        <div>
          <dt>Час повідомлення</dt>
          <dd>{formatTimestamp(vessel.timestamp)}</dd>
        </div>
        <div>
          <dt>Джерело</dt>
          <dd>{formatSource(vessel.source)}</dd>
        </div>
      </dl>
    </article>
  );
}

import type { Vessel } from "../app/vessel-model";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseMmsi(value: unknown): string | null {
  if (typeof value === "number") {
    return Number.isSafeInteger(value) && value >= 0 ? String(value) : null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const digits = value.trim();
  return /^[0-9]+$/.test(digits) ? digits : null;
}

function parseTimestamp(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,9}))? \+0000 UTC$/.exec(value);
  if (!match) {
    return null;
  }

  const [, yearText, monthText, dayText, hourText, minuteText, secondText, fraction = ""] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText);

  if (month < 1 || month > 12 || hour > 23 || minute > 59 || second > 59) {
    return null;
  }

  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day < 1 || day > daysInMonth[month - 1]) {
    return null;
  }

  const milliseconds = fraction.padEnd(3, "0").slice(0, 3);
  return `${yearText}-${monthText}-${dayText}T${hourText}:${minuteText}:${secondText}.${milliseconds}Z`;
}

function parseLatitude(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= -90 && value <= 90
    ? value
    : null;
}

function parseLongitude(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= -180 && value <= 180
    ? value
    : null;
}

function parseSpeed(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 102.2
    ? value
    : null;
}

function parseCourse(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value < 360
    ? value
    : null;
}

export function transformPositionReport(input: unknown): Vessel | null {
  try {
    if (!isRecord(input) || !isRecord(input.MetaData) || !isRecord(input.Message)) {
      return null;
    }

    const metadata = input.MetaData;
    const message = input.Message;
    if (!isRecord(message.PositionReport)) {
      return null;
    }

    const report = message.PositionReport;
    const id = parseMmsi(metadata.MMSI);
    const timestamp = parseTimestamp(metadata.time_utc);
    const lat = parseLatitude(report.Latitude);
    const lon = parseLongitude(report.Longitude);

    if (id === null || timestamp === null || lat === null || lon === null) {
      return null;
    }

    const name = typeof metadata.ShipName === "string" ? metadata.ShipName.trim() || null : null;

    return {
      id,
      name,
      lat,
      lon,
      speedKnots: parseSpeed(report.Sog),
      courseDeg: parseCourse(report.Cog),
      timestamp,
      source: "aisstream",
    };
  } catch {
    return null;
  }
}

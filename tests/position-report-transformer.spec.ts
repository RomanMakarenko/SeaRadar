import { expect, test } from "@playwright/test";
import sample from "../data/samples/position-report.sample.json";
import { transformPositionReport } from "../server/position-report-transformer";

type Envelope = {
  MetaData: Record<string, unknown>;
  Message: { PositionReport: Record<string, unknown> };
};

function createEnvelope(): Envelope {
  return structuredClone(sample) as unknown as Envelope;
}

test("maps the synthetic PositionReport sample to a Vessel", () => {
  expect(transformPositionReport(sample)).toEqual({
    id: "999000001",
    name: "SYNTHETIC TRAINING VESSEL",
    lat: 51,
    lon: 1.45,
    speedKnots: 12.4,
    courseDeg: 123.4,
    timestamp: "2026-09-23T15:00:00.000Z",
    source: "aisstream",
  });
});

test("normalizes supported MMSI values and rejects unsupported ones", () => {
  const accepted: Array<[unknown, string]> = [
    [0, "0"],
    [999000001, "999000001"],
    ["  00123  ", "00123"],
  ];

  for (const [mmsi, expected] of accepted) {
    const envelope = createEnvelope();
    envelope.MetaData.MMSI = mmsi;
    expect(transformPositionReport(envelope)?.id).toBe(expected);
  }

  const rejected: unknown[] = [
    -1,
    1.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    Number.MAX_SAFE_INTEGER + 1,
    "",
    "   ",
    "+123",
    "-123",
    "12.3",
    "１２３",
    null,
    true,
    {},
  ];

  for (const mmsi of rejected) {
    const envelope = createEnvelope();
    envelope.MetaData.MMSI = mmsi;
    expect(transformPositionReport(envelope), `MMSI ${String(mmsi)}`).toBeNull();
  }
});

test("normalizes strict UTC timestamps to millisecond precision", () => {
  const cases: Array<[string, string]> = [
    ["2024-02-29 01:02:03 +0000 UTC", "2024-02-29T01:02:03.000Z"],
    ["2024-02-29 01:02:03.4 +0000 UTC", "2024-02-29T01:02:03.400Z"],
    ["2024-02-29 01:02:03.45 +0000 UTC", "2024-02-29T01:02:03.450Z"],
    ["2024-02-29 01:02:03.456 +0000 UTC", "2024-02-29T01:02:03.456Z"],
    ["2024-02-29 01:02:03.456789123 +0000 UTC", "2024-02-29T01:02:03.456Z"],
  ];

  for (const [time, expected] of cases) {
    const envelope = createEnvelope();
    envelope.MetaData.time_utc = time;
    expect(transformPositionReport(envelope)?.timestamp).toBe(expected);
  }
});

test("rejects malformed, non-UTC, and impossible timestamps", () => {
  const rejected = [
    "2025-02-29 01:02:03 +0000 UTC",
    "2024-13-01 01:02:03 +0000 UTC",
    "2024-04-31 01:02:03 +0000 UTC",
    "2024-01-01 24:00:00 +0000 UTC",
    "2024-01-01 01:60:00 +0000 UTC",
    "2024-01-01 01:02:60 +0000 UTC",
    "2024-01-01 01:02:03. +0000 UTC",
    "2024-01-01 01:02:03.1234567890 +0000 UTC",
    "2024-01-01 01:02:03 +0100 UTC",
    "2024-01-01 01:02:03 +0000 GMT",
    "2024-01-01T01:02:03Z",
  ];

  for (const time of rejected) {
    const envelope = createEnvelope();
    envelope.MetaData.time_utc = time;
    expect(transformPositionReport(envelope), time).toBeNull();
  }
});

test("rejects malformed envelopes and invalid required fields without throwing", () => {
  const malformed: unknown[] = [
    null,
    undefined,
    [],
    "envelope",
    {},
    { MetaData: null, Message: {} },
    { MetaData: {}, Message: null },
    { MetaData: {}, Message: { PositionReport: [] } },
  ];

  for (const envelope of malformed) {
    expect(() => transformPositionReport(envelope)).not.toThrow();
    expect(transformPositionReport(envelope)).toBeNull();
  }

  const invalidRequiredFields: Array<["MetaData" | "PositionReport", string, unknown]> = [
    ["MetaData", "MMSI", undefined],
    ["MetaData", "time_utc", "not a timestamp"],
    ["PositionReport", "Latitude", undefined],
    ["PositionReport", "Longitude", undefined],
  ];

  for (const [section, field, value] of invalidRequiredFields) {
    const envelope = createEnvelope();
    const target = section === "MetaData" ? envelope.MetaData : envelope.Message.PositionReport;
    target[field] = value;
    expect(transformPositionReport(envelope)).toBeNull();
  }
});

test("uses report coordinates and accepts their inclusive geographic bounds", () => {
  const envelope = createEnvelope();
  envelope.MetaData.latitude = -12;
  envelope.MetaData.longitude = -34;
  envelope.Message.PositionReport.Latitude = 90;
  envelope.Message.PositionReport.Longitude = -180;
  expect(transformPositionReport(envelope)).toMatchObject({ lat: 90, lon: -180 });

  envelope.Message.PositionReport.Latitude = -90;
  envelope.Message.PositionReport.Longitude = 180;
  expect(transformPositionReport(envelope)).toMatchObject({ lat: -90, lon: 180 });
});

test("rejects unavailable, out-of-range, and non-numeric report coordinates", () => {
  const invalidCoordinates: Array<["Latitude" | "Longitude", unknown]> = [
    ["Latitude", 91],
    ["Latitude", -91],
    ["Latitude", "51"],
    ["Latitude", Number.NaN],
    ["Longitude", 181],
    ["Longitude", -181],
    ["Longitude", "1.45"],
    ["Longitude", Number.POSITIVE_INFINITY],
  ];

  for (const [field, value] of invalidCoordinates) {
    const envelope = createEnvelope();
    envelope.Message.PositionReport[field] = value;
    expect(transformPositionReport(envelope), `${field}=${String(value)}`).toBeNull();
  }

  const missingCoordinates = createEnvelope();
  delete missingCoordinates.Message.PositionReport.Latitude;
  expect(transformPositionReport(missingCoordinates)).toBeNull();
});

test("maps invalid optional motion values to null and preserves valid zero", () => {
  const envelope = createEnvelope();
  envelope.Message.PositionReport.Sog = 0;
  envelope.Message.PositionReport.Cog = 0;
  expect(transformPositionReport(envelope)).toMatchObject({ speedKnots: 0, courseDeg: 0 });

  const cases: Array<["Sog" | "Cog", unknown, "speedKnots" | "courseDeg"]> = [
    ["Sog", undefined, "speedKnots"],
    ["Sog", "12.4", "speedKnots"],
    ["Sog", 102.3, "speedKnots"],
    ["Sog", -0.1, "speedKnots"],
    ["Sog", 102.21, "speedKnots"],
    ["Cog", undefined, "courseDeg"],
    ["Cog", "123.4", "courseDeg"],
    ["Cog", 360, "courseDeg"],
    ["Cog", -0.1, "courseDeg"],
  ];

  for (const [field, value, outputField] of cases) {
    const report = createEnvelope();
    if (value === undefined) {
      delete report.Message.PositionReport[field];
    } else {
      report.Message.PositionReport[field] = value;
    }
    expect(transformPositionReport(report)?.[outputField]).toBeNull();
  }

  const upperBounds = createEnvelope();
  upperBounds.Message.PositionReport.Sog = 102.2;
  upperBounds.Message.PositionReport.Cog = 359.999;
  expect(transformPositionReport(upperBounds)).toMatchObject({
    speedKnots: 102.2,
    courseDeg: 359.999,
  });
});

test("ignores TrueHeading and unknown optional fields and does not mutate input", () => {
  const envelope = createEnvelope();
  envelope.Message.PositionReport.Cog = 17.5;
  envelope.Message.PositionReport.TrueHeading = 250;
  envelope.Message.PositionReport.ExtraField = { value: "ignored" };
  const before = structuredClone(envelope);

  expect(transformPositionReport(envelope)).toMatchObject({ courseDeg: 17.5 });
  expect(envelope).toEqual(before);
});

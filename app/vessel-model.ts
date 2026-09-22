export type VesselSource = "demo" | "aisstream";
export type RoutePoint = readonly [lat: number, lon: number];

export interface Vessel {
  id: string;
  name: string | null;
  lat: number;
  lon: number;
  speedKnots: number | null;
  courseDeg: number | null;
  timestamp: string;
  source: VesselSource;
}

export interface DemoVessel extends Vessel {
  route: readonly RoutePoint[];
}

export const DEMO_VESSELS = [
  {
    id: "demo-1",
    name: "Демо-судно 1",
    lat: 51.0,
    lon: 1.45,
    speedKnots: 12,
    courseDeg: 0,
    timestamp: "2026-09-22T12:00:00Z",
    source: "demo",
    route: [
      [51.0, 1.45],
      [51.01, 1.45],
      [51.02, 1.465],
      [51.03, 1.48],
      [51.04, 1.495],
      [51.05, 1.51],
      [51.06, 1.525],
      [51.07, 1.54],
      [51.08, 1.555],
      [51.09, 1.57],
    ],
  },
  {
    id: "demo-2",
    name: "Демо-судно 2",
    lat: 50.9,
    lon: 1.15,
    speedKnots: 8.5,
    courseDeg: 90,
    timestamp: "2026-09-22T12:01:00Z",
    source: "demo",
    route: [
      [50.9, 1.15],
      [50.9, 1.16],
      [50.91, 1.17],
      [50.92, 1.18],
      [50.93, 1.19],
      [50.94, 1.2],
      [50.95, 1.21],
      [50.96, 1.22],
      [50.97, 1.23],
      [50.98, 1.24],
    ],
  },
  {
    id: "demo-3",
    name: "Демо-судно 3",
    lat: 51.1,
    lon: 1.75,
    speedKnots: 10,
    courseDeg: 180,
    timestamp: "2026-09-22T12:02:00Z",
    source: "demo",
    route: [
      [51.1, 1.75],
      [51.09, 1.75],
      [51.08, 1.735],
      [51.07, 1.72],
      [51.06, 1.705],
      [51.05, 1.69],
      [51.04, 1.675],
      [51.03, 1.66],
      [51.02, 1.645],
      [51.01, 1.63],
    ],
  },
] as const satisfies readonly DemoVessel[];

export const DEMO_VESSEL = DEMO_VESSELS[0];

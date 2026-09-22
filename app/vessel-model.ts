import { MAP_CONFIG } from "./map-config";

export type VesselSource = "demo" | "aisstream";

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

export const DEMO_VESSEL: Vessel = {
  id: "demo-1",
  name: "Демо-судно 1",
  lat: MAP_CONFIG.center[0],
  lon: MAP_CONFIG.center[1],
  speedKnots: 12,
  courseDeg: 135,
  timestamp: "2026-09-22T12:00:00Z",
  source: "demo",
};

export type MapCoordinate = [number, number];
export type MapBounds = [MapCoordinate, MapCoordinate];

export const MAP_CONFIG: {
  bounds: MapBounds;
  center: MapCoordinate;
  zoom: number;
  tileUrl: string;
  attribution: string;
} = {
  bounds: [
    [50.75, 0.95],
    [51.25, 1.95],
  ],
  center: [51.0, 1.45],
  zoom: 10,
  tileUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: "© OpenStreetMap contributors",
};

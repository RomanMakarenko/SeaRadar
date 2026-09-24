"use client";

import type {
  DivIcon,
  DivIconOptions,
  LatLngExpression,
  Map as LeafletMap,
  Marker,
  MarkerOptions,
  TileLayer,
} from "leaflet";
import { useEffect, useRef } from "react";
import { MAP_CONFIG } from "./map-config";
import { DEMO_VESSELS } from "./vessel-model";
import type { RoutePoint, Vessel } from "./vessel-model";

const DEMO_TICK_MS = 2000;

type MapMode = "demo" | "hidden" | "snapshot";

interface SeaMapProps {
  mode: MapMode;
  vessels: Vessel[];
  viewResetToken: number;
  onVesselSelect: (vessel: Vessel) => void;
  onVesselUpdate: (vessel: Vessel) => void;
}

interface MotionState {
  vessel: Vessel;
  route: readonly RoutePoint[];
  routeIndex: number;
}

interface VesselMarker {
  id: string;
  marker: Marker;
  handleClick: () => void;
}

interface LeafletFactories {
  divIcon(options?: DivIconOptions): DivIcon;
  marker(latlng: LatLngExpression, options?: MarkerOptions): Marker;
}

function calculateBearing(from: RoutePoint, to: RoutePoint): number {
  const [fromLat, fromLon] = from;
  const [toLat, toLon] = to;
  const fromLatitude = (fromLat * Math.PI) / 180;
  const toLatitude = (toLat * Math.PI) / 180;
  const deltaLongitude = ((toLon - fromLon) * Math.PI) / 180;
  const y = Math.sin(deltaLongitude) * Math.cos(toLatitude);
  const x =
    Math.cos(fromLatitude) * Math.sin(toLatitude) -
    Math.sin(fromLatitude) *
      Math.cos(toLatitude) *
      Math.cos(deltaLongitude);

  return (((Math.atan2(y, x) * 180) / Math.PI + 360) % 360 + 360) % 360;
}

function updateMarkerElement(marker: Marker, vessel: Vessel): void {
  const markerElement = marker.getElement();
  if (!markerElement) {
    return;
  }

  markerElement.dataset.vesselId = vessel.id;
  markerElement.dataset.icon = vessel.courseDeg === null ? "neutral" : "course";

  const glyph = markerElement.querySelector<HTMLElement>(".vessel-glyph");
  if (!glyph) {
    return;
  }

  if (vessel.courseDeg === null) {
    glyph.style.removeProperty("--vessel-course");
  } else {
    glyph.style.setProperty("--vessel-course", `${vessel.courseDeg}deg`);
  }
}

function createMotionStates(startedAt: string): MotionState[] {
  return DEMO_VESSELS.map((demoVessel) => ({
    vessel: { ...demoVessel, timestamp: startedAt },
    route: demoVessel.route,
    routeIndex: 0,
  }));
}

export default function SeaMap({
  mode,
  vessels,
  viewResetToken,
  onVesselSelect,
  onVesselUpdate,
}: SeaMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const tileLayerRef = useRef<TileLayer | null>(null);
  const leafletRef = useRef<LeafletFactories | null>(null);
  const markersRef = useRef<VesselMarker[]>([]);
  const motionStatesRef = useRef<MotionState[]>([]);
  const timerIdRef = useRef<number | null>(null);
  const lastAppliedResetTokenRef = useRef(0);
  const modeRef = useRef(mode);
  const vesselsRef = useRef(vessels);
  const viewResetTokenRef = useRef(viewResetToken);
  const onVesselSelectRef = useRef(onVesselSelect);
  const onVesselUpdateRef = useRef(onVesselUpdate);
  const reconcileMarkersRef = useRef<() => void>(() => {});
  const tickMotionRef = useRef<() => void>(() => {});

  modeRef.current = mode;
  vesselsRef.current = vessels;
  viewResetTokenRef.current = viewResetToken;
  onVesselSelectRef.current = onVesselSelect;
  onVesselUpdateRef.current = onVesselUpdate;

  const removeMarkers = () => {
    for (const { marker, handleClick } of markersRef.current) {
      marker.off("click", handleClick);
      marker.remove();
    }
    markersRef.current = [];
    motionStatesRef.current = [];
  };

  reconcileMarkersRef.current = () => {
    const map = mapRef.current;
    const leaflet = leafletRef.current;
    if (!map || !leaflet) {
      return;
    }

    removeMarkers();
    const motionStates =
      modeRef.current === "demo" ? createMotionStates(new Date().toISOString()) : [];
    motionStatesRef.current = motionStates;
    const currentVessels =
      modeRef.current === "demo"
        ? motionStates.map(({ vessel }) => vessel)
        : modeRef.current === "snapshot"
          ? vesselsRef.current
          : [];

    for (const vessel of currentVessels) {
      const courseStyle =
        vessel.courseDeg === null ? "" : ` style="--vessel-course: ${vessel.courseDeg}deg"`;
      const vesselIcon = leaflet.divIcon({
        className: "vessel-marker",
        html: `<span class="vessel-glyph"${courseStyle} aria-hidden="true"></span>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      const marker = leaflet
        .marker([vessel.lat, vessel.lon], { icon: vesselIcon, interactive: true })
        .addTo(map);
      const motionState = motionStates.find(({ vessel: current }) => current.id === vessel.id);
      const handleClick = () => {
        onVesselSelectRef.current(motionState?.vessel ?? vessel);
      };
      marker.on("click", handleClick);
      updateMarkerElement(marker, vessel);
      markersRef.current.push({ id: vessel.id, marker, handleClick });
    }
  };

  tickMotionRef.current = () => {
    if (modeRef.current !== "demo") {
      return;
    }

    const timestamp = new Date().toISOString();
    for (const motionState of motionStatesRef.current) {
      const nextRouteIndex = motionState.routeIndex + 1;
      if (nextRouteIndex >= motionState.route.length) {
        continue;
      }

      const currentPoint = motionState.route[motionState.routeIndex];
      const nextPoint = motionState.route[nextRouteIndex];
      const [lat, lon] = nextPoint;
      const reachedFinalPoint = nextRouteIndex === motionState.route.length - 1;
      const updatedVessel: Vessel = {
        ...motionState.vessel,
        lat,
        lon,
        courseDeg: calculateBearing(currentPoint, nextPoint),
        speedKnots: reachedFinalPoint ? 0 : motionState.vessel.speedKnots,
        timestamp,
      };

      motionState.vessel = updatedVessel;
      motionState.routeIndex = nextRouteIndex;

      const markerEntry = markersRef.current.find(({ id }) => id === updatedVessel.id);
      markerEntry?.marker.setLatLng([updatedVessel.lat, updatedVessel.lon]);
      if (markerEntry) {
        updateMarkerElement(markerEntry.marker, updatedVessel);
      }
      onVesselUpdateRef.current(updatedVessel);
    }
  };

  useEffect(() => {
    reconcileMarkersRef.current();
  }, [mode, vessels]);

  useEffect(() => {
    if (mode !== "demo") {
      if (timerIdRef.current !== null) {
        window.clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
      return;
    }

    if (timerIdRef.current === null) {
      timerIdRef.current = window.setInterval(() => {
        tickMotionRef.current();
      }, DEMO_TICK_MS);
    }

    return () => {
      if (timerIdRef.current !== null) {
        window.clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
    };
  }, [mode]);

  useEffect(() => {
    const container = mapElementRef.current;
    let disposed = false;
    let map: LeafletMap | null = null;
    let resizeFrame: number | null = null;

    const updateMapViewAttributes = () => {
      if (!container || !map) {
        return;
      }

      const center = map.getCenter();
      container.dataset.mapZoom = String(map.getZoom());
      container.dataset.mapCenter = `${center.lat.toFixed(4)},${center.lng.toFixed(4)}`;
    };

    const invalidateSize = () => {
      if (resizeFrame !== null) {
        cancelAnimationFrame(resizeFrame);
      }

      resizeFrame = requestAnimationFrame(() => {
        mapRef.current?.invalidateSize({ pan: false });
      });
    };

    const initializeMap = async () => {
      if (!container) {
        return;
      }

      const leaflet = await import("leaflet");
      if (disposed) {
        return;
      }

      const L = leaflet.default;
      leafletRef.current = { divIcon: L.divIcon, marker: L.marker };
      map = L.map(container, {
        center: MAP_CONFIG.center,
        zoom: MAP_CONFIG.zoom,
        maxBounds: MAP_CONFIG.bounds,
        maxBoundsViscosity: 1,
      });
      mapRef.current = map;
      tileLayerRef.current = leaflet.default
        .tileLayer(MAP_CONFIG.tileUrl, { attribution: MAP_CONFIG.attribution })
        .addTo(map);

      const resetToken = viewResetTokenRef.current;
      if (resetToken > lastAppliedResetTokenRef.current) {
        map.setView(MAP_CONFIG.center, MAP_CONFIG.zoom);
        lastAppliedResetTokenRef.current = resetToken;
      }

      map.on("moveend", updateMapViewAttributes);
      map.on("zoomend", updateMapViewAttributes);
      updateMapViewAttributes();
      reconcileMarkersRef.current();
      invalidateSize();
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(invalidateSize);
    resizeObserver?.observe(container ?? document.body);
    window.addEventListener("resize", invalidateSize);
    void initializeMap();

    return () => {
      disposed = true;
      window.removeEventListener("resize", invalidateSize);
      resizeObserver?.disconnect();

      if (timerIdRef.current !== null) {
        window.clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
      if (resizeFrame !== null) {
        cancelAnimationFrame(resizeFrame);
      }

      removeMarkers();
      map?.off("moveend", updateMapViewAttributes);
      map?.off("zoomend", updateMapViewAttributes);
      tileLayerRef.current?.remove();
      mapRef.current?.remove();
      tileLayerRef.current = null;
      mapRef.current = null;
      leafletRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (map && viewResetToken > lastAppliedResetTokenRef.current) {
      map.setView(MAP_CONFIG.center, MAP_CONFIG.zoom);
      lastAppliedResetTokenRef.current = viewResetToken;
    }
  }, [viewResetToken]);

  return <div ref={mapElementRef} className="sea-map" aria-label="Карта Дуврської протоки" />;
}

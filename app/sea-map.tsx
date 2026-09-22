"use client";

import type { Map as LeafletMap, Marker, TileLayer } from "leaflet";
import { useEffect, useRef } from "react";
import { MAP_CONFIG } from "./map-config";
import { DEMO_VESSELS } from "./vessel-model";
import type { RoutePoint, Vessel } from "./vessel-model";

const DEMO_TICK_MS = 2000;

interface SeaMapProps {
  onVesselSelect: (vessel: Vessel) => void;
  onVesselUpdate: (vessel: Vessel) => void;
}

interface MotionState {
  vessel: Vessel;
  route: readonly RoutePoint[];
  routeIndex: number;
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
  onVesselSelect,
  onVesselUpdate,
}: SeaMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const onVesselSelectRef = useRef(onVesselSelect);
  const onVesselUpdateRef = useRef(onVesselUpdate);
  onVesselSelectRef.current = onVesselSelect;
  onVesselUpdateRef.current = onVesselUpdate;

  useEffect(() => {
    const container = mapElementRef.current;
    let disposed = false;
    let map: LeafletMap | null = null;
    let tileLayer: TileLayer | null = null;
    let timerId: number | null = null;
    const motionStates = createMotionStates(new Date().toISOString());
    const vesselMarkers: Array<{
      id: string;
      marker: Marker;
      handleClick: () => void;
    }> = [];
    let resizeFrame: number | null = null;

    const invalidateSize = () => {
      if (resizeFrame !== null) {
        cancelAnimationFrame(resizeFrame);
      }

      resizeFrame = requestAnimationFrame(() => {
        map?.invalidateSize({ pan: false });
      });
    };

    const tickMotion = () => {
      if (disposed) {
        return;
      }

      const timestamp = new Date().toISOString();
      for (const motionState of motionStates) {
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

        const markerEntry = vesselMarkers.find(
          ({ id }) => id === updatedVessel.id,
        );
        markerEntry?.marker.setLatLng([updatedVessel.lat, updatedVessel.lon]);
        if (markerEntry) {
          updateMarkerElement(markerEntry.marker, updatedVessel);
        }
        onVesselUpdateRef.current(updatedVessel);
      }
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
      map = L.map(container, {
        center: MAP_CONFIG.center,
        zoom: MAP_CONFIG.zoom,
        maxBounds: MAP_CONFIG.bounds,
        maxBoundsViscosity: 1,
      });

      tileLayer = L.tileLayer(MAP_CONFIG.tileUrl, {
        attribution: MAP_CONFIG.attribution,
      }).addTo(map);

      for (const motionState of motionStates) {
        const vessel = motionState.vessel;
        const courseStyle =
          vessel.courseDeg === null
            ? ""
            : ` style="--vessel-course: ${vessel.courseDeg}deg"`;
        const vesselIcon = L.divIcon({
          className: "vessel-marker",
          html: `<span class="vessel-glyph"${courseStyle} aria-hidden="true"></span>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker([vessel.lat, vessel.lon], {
          icon: vesselIcon,
          interactive: true,
        }).addTo(map);

        const handleClick = () => {
          onVesselSelectRef.current(motionState.vessel);
        };
        marker.on("click", handleClick);
        updateMarkerElement(marker, vessel);

        vesselMarkers.push({ id: vessel.id, marker, handleClick });
      }

      timerId = window.setInterval(tickMotion, DEMO_TICK_MS);
      invalidateSize();
    };

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(invalidateSize);

    resizeObserver?.observe(container ?? document.body);
    window.addEventListener("resize", invalidateSize);
    void initializeMap();

    return () => {
      disposed = true;
      window.removeEventListener("resize", invalidateSize);
      resizeObserver?.disconnect();

      if (timerId !== null) {
        window.clearInterval(timerId);
      }
      if (resizeFrame !== null) {
        cancelAnimationFrame(resizeFrame);
      }

      for (const { marker, handleClick } of vesselMarkers) {
        marker.off("click", handleClick);
        marker.remove();
      }
      vesselMarkers.length = 0;
      tileLayer?.remove();
      map?.remove();
      timerId = null;
      tileLayer = null;
      map = null;
    };
  }, []);

  return <div ref={mapElementRef} className="sea-map" aria-label="Карта Дуврської протоки" />;
}
"use client";

import type { Map as LeafletMap, TileLayer } from "leaflet";
import { useEffect, useRef } from "react";
import { MAP_CONFIG } from "./map-config";

export default function SeaMap() {
  const mapElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mapElementRef.current;
    let disposed = false;
    let map: LeafletMap | null = null;
    let tileLayer: TileLayer | null = null;
    let resizeFrame: number | null = null;

    const invalidateSize = () => {
      if (resizeFrame !== null) {
        cancelAnimationFrame(resizeFrame);
      }

      resizeFrame = requestAnimationFrame(() => {
        map?.invalidateSize({ pan: false });
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
      map = L.map(container, {
        center: MAP_CONFIG.center,
        zoom: MAP_CONFIG.zoom,
        maxBounds: MAP_CONFIG.bounds,
        maxBoundsViscosity: 1,
      });

      tileLayer = L.tileLayer(MAP_CONFIG.tileUrl, {
        attribution: MAP_CONFIG.attribution,
      }).addTo(map);

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

      if (resizeFrame !== null) {
        cancelAnimationFrame(resizeFrame);
      }

      tileLayer?.remove();
      map?.remove();
      tileLayer = null;
      map = null;
    };
  }, []);

  return <div ref={mapElementRef} className="sea-map" aria-label="Карта Дуврської протоки" />;
}

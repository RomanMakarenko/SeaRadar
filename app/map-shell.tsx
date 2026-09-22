"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import VesselCard from "./vessel-card";
import type { Vessel } from "./vessel-model";

const SeaMap = dynamic(() => import("./sea-map"), {
  ssr: false,
  loading: () => <div className="sea-map" aria-label="Завантаження карти Дуврської протоки" />,
});

export default function MapShell() {
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const handleVesselSelect = useCallback((vessel: Vessel) => {
    setSelectedVessel((currentVessel) =>
      currentVessel?.id === vessel.id ? currentVessel : vessel,
    );
  }, []);

  return (
    <div className="sea-map-shell">
      <SeaMap onVesselSelect={handleVesselSelect} />
      <div className="map-panel">
        <button type="button" className="future-data-button" disabled>
          Завантажити справжні дані
        </button>
        <div className="map-source-label" data-source="demo">
          Демонстраційні дані
        </div>
        {selectedVessel ? <VesselCard vessel={selectedVessel} /> : null}
      </div>
    </div>
  );
}

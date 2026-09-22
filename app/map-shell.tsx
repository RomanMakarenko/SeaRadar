"use client";

import dynamic from "next/dynamic";

const SeaMap = dynamic(() => import("./sea-map"), {
  ssr: false,
  loading: () => <div className="sea-map" aria-label="Завантаження карти Дуврської протоки" />,
});

export default function MapShell() {
  return (
    <div className="sea-map-shell">
      <SeaMap />
      <div className="map-source-label" data-source="demo">
        Демонстраційні дані
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import L from "leaflet";
import GlassModal from "./GlassModal";

export default function MapModal({ weather, onClose }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map only once
    mapRef.current = L.map(mapContainerRef.current, {
      center: [weather.coord.lat, weather.coord.lon],
      zoom: 11,
      zoomControl: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapRef.current);

    L.marker([weather.coord.lat, weather.coord.lon])
      .addTo(mapRef.current)
      .bindPopup(`${weather.name}`)
      .openPopup();

    // 🔥 Important — fix blank map on modal load
    setTimeout(() => {
      mapRef.current.invalidateSize();
    }, 200);

    // Cleanup on close
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [weather]);

  return (
    <GlassModal title="Weather Map View" onClose={onClose}>
      <div
        ref={mapContainerRef}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "18px",
          overflow: "hidden"
        }}
      />
    </GlassModal>
  );
}

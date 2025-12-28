import "./styles/global.css";
import { useState } from "react";

import GlassCard from "./components/GlassCard";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import StatButtons from "./components/StatButtons";
import SkeletonCard from "./components/SkeletonCard";
import { ErrorState } from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";
import { useWeather } from "./hooks/useWeather";

import TimelineModal from "./components/TimelineModal.jsx";
import MapModal from "./components/MapModal.jsx";
import ForecastModal from "./components/ForecastModal.jsx";
import AQIModal from "./components/AQIModal.jsx";

export default function App() {
  const { city, setCity, data, loading, error, loadWeather } = useWeather();
  const [view, setView] = useState("");

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported on this device");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const query = `${coords.latitude},${coords.longitude}`;
        loadWeather(query);
      },
      () => alert("Location permission denied")
    );
  };

  return (
    <>
      <GlassCard>
        <SearchBar
          value={city}
          onChange={setCity}
          onSubmit={(e) => {
            e.preventDefault();
            if (city.trim()) loadWeather(city.trim());
          }}
          onLocate={handleLocate}
        />

        {/* ---------- LOADING ---------- */}
        {loading && <SkeletonCard />}

        {/* ---------- ERROR ---------- */}
        {!loading && error && <ErrorState message={error} />}

        {/* ---------- EMPTY ---------- */}
        {!loading && !data && !error && <EmptyState />}

        {/* ---------- MAIN WEATHER ---------- */}
        {data && !loading && (
          <>
            <WeatherDetails
              data={data.weather}
              forecast={data.forecast}
              air={data.air}
            />

            <StatButtons
              onTimeline={() => setView("timeline")}
              onMap={() => setView("map")}
              onForecast={() => setView("forecast")}
              onAqi={() => setView("aqi")}
            />
          </>
        )}
      </GlassCard>

      {/* ---------- MODALS ---------- */}

      {view === "timeline" && (
        <TimelineModal data={data.forecast} onClose={() => setView("")} />
      )}

      {view === "map" && (
        <MapModal weather={data.weather} onClose={() => setView("")} />
      )}

      {view === "forecast" && (
        <ForecastModal data={data.forecast} onClose={() => setView("")} />
      )}

      {view === "aqi" && (
        <AQIModal air={data.air} onClose={() => setView("")} />
      )}
    </>
  );
}

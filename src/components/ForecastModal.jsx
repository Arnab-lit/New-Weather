import GlassModal from "./GlassModal";
import { Line } from "react-chartjs-2";
import WeatherIcon from "./icons/WeatherIcon";

import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
} from "chart.js";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

// ---- Group forecast entries by day ----
function groupByDay(list) {
  const days = {};

  list.forEach(item => {
    const date = new Date(item.dt * 1000)
      .toLocaleDateString("en-US", { weekday: "long" });

    if (!days[date]) days[date] = [];
    days[date].push(item);
  });

  return days;
}

export default function ForecastModal({ data, onClose }) {

  // Build grouped day data
  const grouped = groupByDay(data.list);
  const dayEntries = Object.entries(grouped).slice(0, 7);

  // ---- Chart data from daily averages ----
  const chartLabels = dayEntries.map(([day]) => day);

  const avgTemps = dayEntries.map(([_, values]) =>
    values.reduce((s,v)=>s+v.main.temp,0) / values.length
  );

  const minTemps = dayEntries.map(([_, values]) =>
    Math.min(...values.map(v => v.main.temp))
  );

  const maxTemps = dayEntries.map(([_, values]) =>
    Math.max(...values.map(v => v.main.temp))
  );

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Avg Temp °C",
        data: avgTemps,
        fill: true,
        tension: 0.35,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,.9)",
        backgroundColor: "rgba(255,255,255,.15)",
        pointRadius: 5,
        pointBackgroundColor: "#ffffff",
      },
      {
        label: "Max °C",
        data: maxTemps,
        borderColor: "rgba(255,200,120,.9)",
        borderWidth: 1.5,
        tension: 0.35,
        pointRadius: 0
      },
      {
        label: "Min °C",
        data: minTemps,
        borderColor: "rgba(180,220,255,.9)",
        borderWidth: 1.5,
        tension: 0.35,
        pointRadius: 0
      }
    ]
  };

  const options = {
    plugins: {
      legend: { labels: { color: "#fff" } },
      tooltip: { intersect: false, mode: "index" },
    },
    scales: {
      x: { ticks: { color: "#ddd" } },
      y: { ticks: { color: "#ddd" } }
    }
  };

  return (
    <GlassModal title="7-Day Forecast" onClose={onClose}>

      {/* Chart */}
      <Line data={chartData} options={options} />

      {/* Cards */}
      <div className="forecast-cards">
        {dayEntries.map(([day, values], i) => {
          const temps = values.map(v => v.main.temp);
          const min = Math.min(...temps);
          const max = Math.max(...temps);
          const first = values[0];

          return (
            <div key={i} className="forecast-card">

              <p className="day-label">{day}</p>

              <WeatherIcon type={first.weather[0].main} />

              <p className="cond">{first.weather[0].description}</p>

              <p className="temps">
                {Math.round(min)}° / {Math.round(max)}°
              </p>

              <p className="meta">
                💧 {first.main.humidity}% &nbsp;•&nbsp;
                💨 {Math.round(first.wind.speed)} m/s
              </p>
            </div>
          );
        })}
      </div>

    </GlassModal>
  );
}

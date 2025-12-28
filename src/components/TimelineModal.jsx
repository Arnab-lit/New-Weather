import GlassModal from "./GlassModal";
import WeatherIcon from "./icons/WeatherIcon";

export default function TimelineModal({ data, onClose }) {
  const hours = data.list.slice(0, 12);

  return (
    <GlassModal title="12-Hour Weather Outlook" onClose={onClose}>
      
      <div className="timeline-strip">
        {hours.map((h,i)=>(
          <div key={i} className="timeline-card">

            <p className="t-hour">
              {new Date(h.dt * 1000).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>

            <div className="t-icon">
              <WeatherIcon type={h.weather[0].main} />
            </div>

            <p className="t-temp">{Math.round(h.main.temp)}°</p>

            <p className="t-meta">
              Feels {Math.round(h.main.feels_like)}° · 💧 {h.main.humidity}%
            </p>

            <p className="t-cond">{h.weather[0].main}</p>
          </div>
        ))}
      </div>
    </GlassModal>
  );
}

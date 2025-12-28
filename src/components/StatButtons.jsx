import "../styles/buttons.css";

export default function StatButtons(props) {
  return (
    <div className="feature-grid">
      <button className="feature-btn" onClick={props.onTimeline}>🕒 12-hour timeline</button>
      <button className="feature-btn" onClick={props.onMap}>🌍 Map View</button>
      <button className="feature-btn" onClick={props.onForecast}>📅 7-day forecast</button>
      <button className="feature-btn" onClick={props.onAqi}>🍃 AQI details</button>
    </div>
  );
}

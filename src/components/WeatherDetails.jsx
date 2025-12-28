import WeatherIcon from "./icons/WeatherIcon";

// Compute realistic min & max from next 24 hours
function getDayMinMax(forecast) {
  if (!forecast?.list || forecast.list.length === 0)
    return { min: null, max: null };

  const temps = forecast.list
    .slice(0, 8) // next 24h (3h × 8)
    .map(h => h.main.temp);

  return {
    min: Math.min(...temps),
    max: Math.max(...temps)
  };
}

// AQI label mapper
function getAQILabel(air) {
  if (!air?.list?.length) return "Unavailable";

  const aqi = air.list[0].main.aqi;

  const map = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor"
  };

  return map[aqi] || "Unknown";
}

export default function WeatherDetails({ data, forecast, air }) {
  if (!data) return null;

  const weather = data.weather?.[0];
  const main = data.main;

  const { min, max } = getDayMinMax(forecast);

  return (
    <>
      {/* Header */}
      <div className="weather-header">
        <h2>{data.name}, {data.sys?.country}</h2>

        <p>
          {weather?.main} · Air Quality: {getAQILabel(air)}
        </p>
      </div>

      {/* Main Section */}
      <div className="weather-main">

        <div className="weather-icon">
          <WeatherIcon type={weather?.main} />
        </div>

        <div className="temp-display">
          <div className="temp">
            {Math.round(main.temp)}°
          </div>

          <div className="range">
            min {Math.round(min)}° · max {Math.round(max)}°
          </div>
        </div>

        <div className="side-info">
          <div>Feels like {Math.round(main.feels_like)}°</div>
          <div>Humidity {main.humidity}%</div>
        </div>

      </div>
    </>
  );
}

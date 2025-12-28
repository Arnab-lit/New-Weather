import "./icons.css";

export default function WeatherIcon({ type }) {
  const map = {
    Haze: <div className="icon haze"></div>,
    Clouds: <div className="icon clouds"></div>,
    Clear: <div className="icon sun"></div>,
    Rain: <div className="icon rain"></div>,
    Mist: <div className="icon mist"></div>,
    Fog: <div className="icon fog"></div>,
    Smoke: <div className="icon haze"></div>,
  };

  return map[type] || <div className="icon clouds"></div>;
}

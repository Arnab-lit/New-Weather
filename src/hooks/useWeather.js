import { useEffect, useState } from "react";
import { fetchWeatherData } from "../api/weatherService";

export const useWeather = () => {
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadWeather = async (c) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetchWeatherData(c);
      setData(res);
      localStorage.setItem("lastCity", c);
    } catch {
      setError("City not found or network issue");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (city) loadWeather(city); }, []);

  return { city, setCity, data, loading, error, loadWeather };
};

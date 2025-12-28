import axios from "axios";

const API_KEY = "2f745fa85d563da5adb87b6cd4b81caf";
const base = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (city) => {
  const weather = await axios.get(`${base}/weather`, {
    params: { q: city, units: "metric", appid: API_KEY },
  });

  const forecast = await axios.get(`${base}/forecast`, {
    params: { q: city, units: "metric", appid: API_KEY },
  });

  const air = await axios.get(`${base}/air_pollution`, {
    params: {
      lat: weather.data.coord.lat,
      lon: weather.data.coord.lon,
      appid: API_KEY,
    },
  });

  return { weather: weather.data, forecast: forecast.data, air: air.data };
};

import GlassModal from "./GlassModal";

export default function AQIModal({ air, onClose }) {
  const levelLabels = ["Good","Fair","Moderate","Poor","Very Poor"];
  const level = levelLabels[air.list[0].main.aqi - 1];

  const c = air.list[0].components;

  return (
    <GlassModal title="Air Quality Index" onClose={onClose}>
      <h2 style={{ marginBottom: "8px" }}>{level}</h2>

      <p>PM2.5: {c.pm2_5}</p>
      <p>PM10: {c.pm10}</p>
      <p>NO₂: {c.no2}</p>
      <p>SO₂: {c.so2}</p>
      <p>O₃: {c.o3}</p>
      <p>CO: {c.co}</p>
    </GlassModal>
  );
}

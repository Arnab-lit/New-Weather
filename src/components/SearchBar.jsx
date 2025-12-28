import "../styles/weather.css";

export default function SearchBar({ value, onChange, onSubmit, onLocate }) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a city name"
      />
      {/* Search button */}
      <button aria-label="Search">🔍</button>
      {/* Current location button */}
      <button
        type="button"
        className="loc-btn"
        aria-label="Use current location"
        onClick={onLocate}
      >
        📍
      </button>


    </form>
  );
}

import "../styles/weather.css";

export default function SearchBar({ value, onChange, onSubmit, onLocate }) {
  return (
    <form className="search-bar" onSubmit={onSubmit}>
      
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter a city name"
      />

      <div className="search-actions">
        <button
          type="button"
          className="gps-btn"
          aria-label="Use current location"
          onClick={onLocate}
        >
          📍
        </button>

        <button
          type="submit"
          className="search-btn"
          aria-label="Search"
        >
          🔍
        </button>
      </div>
    </form>
  );
}

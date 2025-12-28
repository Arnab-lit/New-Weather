import "./modal.css";

export default function GlassModal({ title, onClose, children }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-glass">
        <div className="modal-top">
          <h3>{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found fade-in">
      <h1>404</h1>
      <p style={{ marginBottom: 24, color: "var(--text-dim)" }}>
        This door doesn't exist yet.
      </p>
      <Link to="/">Return to the 10 Doors</Link>
    </div>
  );
}

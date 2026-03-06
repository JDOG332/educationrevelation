export default function PsiBadge({ value }) {
  if (!value || value < 0.01) return null;
  return (
    <span className="psi-badge">
      <span className="psi-symbol">&#936;</span>
      {(value * 100).toFixed(0)}%
    </span>
  );
}

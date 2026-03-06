import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb">
      <Link to="/">HOME</Link>
      {items.map((item, i) => (
        <span key={i}>
          <span className="sep">/</span>{" "}
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

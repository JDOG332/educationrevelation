import { useParams, Link } from "react-router-dom";
import { DOOR_META, SUBCATEGORIES } from "../data/subcategories.js";
import Breadcrumb from "../components/Breadcrumb.jsx";

export default function Door() {
  const { doorKey } = useParams();
  const meta = DOOR_META[doorKey];
  const subs = SUBCATEGORIES[doorKey];

  if (!meta || !subs) {
    return <div className="not-found"><h1>?</h1><p>Door not found.</p></div>;
  }

  const color = subAccent(subs[0]);

  return (
    <div className="fade-in">
      <Breadcrumb items={[{ label: meta.name }]} />

      <div className="page-header">
        <span className="page-emoji">{meta.emoji}</span>
        <h1 style={{ color: `rgb(${color})` }}>{meta.name}</h1>
        <p className="page-tagline">{meta.tagline}</p>
      </div>

      <div className="rooms-grid">
        {subs.map((sub, i) => (
          <Link
            key={sub.id}
            to={`/door/${doorKey}/${sub.id}`}
            className={`room-card fade-in fade-in-delay-${(i % 4) + 1}`}
          >
            <div className="room-icon">{sub.icon}</div>
            <div className="room-name">{sub.name}</div>
            <div className="room-desc">{sub.desc}</div>
            <div className="room-psi">
              <div className="room-psi-bar">
                <div
                  className="room-psi-fill"
                  style={{
                    width: `${sub.psi * 100}%`,
                    background: `rgb(${sub.accent})`,
                  }}
                />
              </div>
              <span className="room-psi-num">{(sub.psi * 100).toFixed(0)}%</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function subAccent(sub) {
  return sub?.accent || "200,200,200";
}

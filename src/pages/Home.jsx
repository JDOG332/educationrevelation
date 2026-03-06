import { Link } from "react-router-dom";
import { DOOR_META, SUBCATEGORIES } from "../data/subcategories.js";
import SearchBar from "../components/SearchBar.jsx";

// Map door keys to their Roman numerals and TEN_DOORS order
const DOOR_ORDER = [
  "sameness", "layers", "rock", "plain", "depths",
  "promise", "gravity", "pillars", "filter", "ancient",
];

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default function Home() {
  return (
    <div className="fade-in">
      <section className="home-hero">
        <h1>10 Doors to Everything</h1>
        <p className="home-subtitle">
          Every piece of human knowledge passes through one of these doors.
          Pick one. Or ask a question.
        </p>
        <SearchBar />
      </section>

      <div className="doors-grid">
        {DOOR_ORDER.map((key, i) => {
          const meta = DOOR_META[key];
          const subs = SUBCATEGORIES[key] || [];
          const avgPsi = subs.length
            ? subs.reduce((s, sub) => s + sub.psi, 0) / subs.length
            : 0;

          return (
            <Link
              key={key}
              to={`/door/${key}`}
              className={`door-card fade-in fade-in-delay-${(i % 4) + 1}`}
              style={{ "--accent": `rgb(${doorColor(key)})` }}
            >
              <div className="door-num">DOOR {ROMAN[i]}</div>
              <span className="door-emoji">{meta.emoji}</span>
              <div className="door-name">{meta.name}</div>
              <div className="door-question">{meta.tagline}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function doorColor(key) {
  const colors = {
    sameness: "201,168,76", layers: "150,180,220", rock: "100,200,150",
    plain: "190,140,220", depths: "224,120,100", promise: "201,168,76",
    gravity: "180,160,120", pillars: "120,180,100", filter: "220,160,160",
    ancient: "200,200,230",
  };
  return colors[key] || "200,200,200";
}

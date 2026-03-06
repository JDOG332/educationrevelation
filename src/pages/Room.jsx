import { useParams, Link } from "react-router-dom";
import { DOOR_META, getSubcategory } from "../data/subcategories.js";
import { TOPIC_CARDS } from "../data/topicCards.js";
import Breadcrumb from "../components/Breadcrumb.jsx";

export default function Room() {
  const { doorKey, subId } = useParams();
  const meta = DOOR_META[doorKey];
  const sub = getSubcategory(doorKey, subId);
  const cards = TOPIC_CARDS[doorKey]?.[subId];

  if (!meta || !sub || !cards) {
    return <div className="not-found"><h1>?</h1><p>Room not found.</p></div>;
  }

  return (
    <div className="fade-in">
      <Breadcrumb items={[
        { label: meta.name, to: `/door/${doorKey}` },
        { label: sub.name },
      ]} />

      <div className="page-header">
        <span className="page-emoji">{sub.icon}</span>
        <h1 style={{ color: `rgb(${sub.accent})` }}>{sub.name}</h1>
        <p className="page-tagline">{sub.desc}</p>
      </div>

      <div className="topics-grid">
        {cards.map((card, i) => (
          <Link
            key={card.id}
            to={`/door/${doorKey}/${subId}/${card.id}`}
            className={`topic-card fade-in fade-in-delay-${(i % 4) + 1}`}
          >
            <div className="topic-num">{String(card.num).padStart(2, "0")}</div>
            <div className="topic-icon">{card.icon}</div>
            <div className="topic-title">{card.title}</div>
            <div className="topic-subtitle">{card.subtitle}</div>
            <p className="topic-simple">{card.simple}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

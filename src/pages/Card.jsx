import { useParams } from "react-router-dom";
import { DOOR_META, getSubcategory } from "../data/subcategories.js";
import { TOPIC_CARDS } from "../data/topicCards.js";
import Breadcrumb from "../components/Breadcrumb.jsx";

export default function Card() {
  const { doorKey, subId, cardId } = useParams();
  const meta = DOOR_META[doorKey];
  const sub = getSubcategory(doorKey, subId);
  const cards = TOPIC_CARDS[doorKey]?.[subId];
  const card = cards?.find((c) => c.id === cardId);

  if (!meta || !sub || !card) {
    return <div className="not-found"><h1>?</h1><p>Card not found.</p></div>;
  }

  const accent = sub.accent || "200,200,200";

  return (
    <div className="card-detail fade-in">
      <Breadcrumb items={[
        { label: meta.name, to: `/door/${doorKey}` },
        { label: sub.name, to: `/door/${doorKey}/${subId}` },
        { label: card.title },
      ]} />

      <div className="card-header">
        <span className="topic-icon" style={{ fontSize: "2.5rem" }}>{card.icon}</span>
        <h1 style={{ color: `rgb(${accent})` }}>{card.title}</h1>
        <div className="card-subtitle">{card.subtitle}</div>
      </div>

      {/* Tier 1: The Truth (3rd grader) */}
      <section className="card-section">
        <div className="card-section-label">THE TRUTH</div>
        <p className="card-simple">{card.simple}</p>
      </section>

      {/* Intuition */}
      {card.intuition && (
        <section className="card-section">
          <div className="card-section-label">THE INTUITION</div>
          <blockquote className="card-intuition">{card.intuition}</blockquote>
        </section>
      )}

      {/* Tier 2: The Senses */}
      {card.senses && card.senses.length > 0 && (
        <section className="card-section">
          <div className="card-section-label">THE SENSES</div>
          <div className="senses-grid">
            {card.senses.map((s) => (
              <div key={s.key} className="sense-item">
                <div className="sense-header">
                  <span className="sense-icon">{s.icon}</span>
                  <span className="sense-label">{s.sense}</span>
                </div>
                <p className="sense-text">{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tier 3: The Depth (Advanced) */}
      {card.advanced && (
        <section className="card-section">
          <div className="card-section-label">THE DEPTH</div>
          <p className="card-advanced">{card.advanced}</p>
        </section>
      )}

      {/* Links */}
      {card.links && card.links.length > 0 && (
        <section className="card-section">
          <div className="card-section-label">LEARN MORE</div>
          <div className="card-links">
            {card.links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="card-link">
                &#8594; {link.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Songs */}
      {card.songs && card.songs.length > 0 && (
        <section className="card-section">
          <div className="card-section-label">LISTEN</div>
          <div className="card-songs">
            {card.songs.map((song, i) => (
              <span key={i} className="card-song">
                <span className="song-title">{song.title}</span> — {song.artist}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

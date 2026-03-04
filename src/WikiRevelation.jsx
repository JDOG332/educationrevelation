import React from "react";
import { PHI } from "./data.js";

export default function WikiRevelation({ data, loading, query }) {
  // Loading state — thinking dots
  if (loading) {
    return (
      <div style={{
        width: "100%", maxWidth: 520, marginTop: Math.round(10 * PHI),
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(13px, 2.5vw, 16px)",
          fontStyle: "italic",
          color: "rgba(79,195,247,0.4)",
          letterSpacing: 2,
          marginBottom: Math.round(5 * PHI),
        }}>
          searching "{query}"
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "rgba(79,195,247,0.5)",
              animation: `breathe 1.2s ${i * 0.2}s ease-in-out infinite`,
            }} />
          ))}
        </div>
      </div>
    );
  }

  if (!data || !data.points || data.points.length === 0) return null;

  return (
    <div style={{
      width: "100%", maxWidth: 520, marginTop: Math.round(10 * PHI),
      display: "flex", flexDirection: "column", alignItems: "center",
    }}>
      {/* Wikipedia article title */}
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: "clamp(10px, 2vw, 12px)",
        letterSpacing: 3,
        color: "rgba(79,195,247,0.35)",
        textTransform: "uppercase",
        marginBottom: Math.round(8 * PHI),
        animation: "fadeSlideUp 0.6s ease both",
      }}>
        {data.title}
      </div>

      {/* Scored bullet points */}
      <div style={{
        width: "100%",
        display: "flex", flexDirection: "column",
        gap: Math.round(5 * PHI),
      }}>
        {data.points.map((point, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              padding: `${Math.round(5 * PHI)}px ${Math.round(6 * PHI)}px`,
              background: "rgba(79,195,247,0.02)",
              border: "1px solid rgba(79,195,247,0.08)",
              borderRadius: Math.round(3 * PHI),
              animation: `fadeSlideUp 0.5s ${i * 0.08}s both ease`,
            }}
          >
            {/* Emoji */}
            <div style={{
              fontSize: "clamp(16px, 3vw, 20px)",
              flexShrink: 0,
              marginTop: 2,
            }}>
              {point.emoji}
            </div>

            {/* Text + score */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(13px, 2.6vw, 16px)",
                color: "rgba(232,232,240,0.65)",
                lineHeight: 1.5,
              }}>
                {point.text}
              </div>

              {/* Truth score bar */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                marginTop: 4,
              }}>
                <div style={{
                  flex: 1, height: 2, borderRadius: 1,
                  background: "rgba(79,195,247,0.06)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${Math.min(100, point.truthScore)}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, rgba(79,195,247,${0.2 + point.truthScore * 0.005}), rgba(201,168,76,${0.2 + point.truthScore * 0.005}))`,
                    borderRadius: 1,
                    transition: "width 0.8s ease",
                  }} />
                </div>
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 9, letterSpacing: 1,
                  color: point.truthScore >= 60
                    ? "rgba(201,168,76,0.5)"
                    : "rgba(79,195,247,0.35)",
                  flexShrink: 0,
                }}>
                  {point.truthScore}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Source link */}
      {data.url && (
        <div style={{
          marginTop: Math.round(10 * PHI),
          textAlign: "center",
          animation: `fadeSlideUp 0.6s ${data.points.length * 0.08 + 0.3}s both ease`,
        }}>
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(8px, 1.6vw, 10px)",
              letterSpacing: 3,
              color: "rgba(79,195,247,0.3)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(79,195,247,0.15)",
            }}
          >
            READ FULL ARTICLE →
          </a>
        </div>
      )}
    </div>
  );
}

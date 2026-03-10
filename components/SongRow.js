"use client";

import { useState } from "react";

const EASE = "cubic-bezier(0.23,1,0.32,1)";

export default function SongRow({ song, rgb }) {
  const [open, setOpen] = useState(false);
  const q = encodeURIComponent(`${song.title} ${song.artist}`);
  const links = [
    { label: "Spotify", url: `https://open.spotify.com/search/${q}` },
    { label: "YouTube", url: `https://music.youtube.com/search?q=${q}` },
    { label: "Apple", url: `https://music.apple.com/search?term=${q}` },
    { label: "Amazon", url: `https://music.amazon.com/search/${q}` },
  ];

  return (
    <div>
      <div onClick={() => setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", gap: "0.382rem", cursor: "pointer",
        padding: "0.618rem 0",
        borderBottom: `1px solid rgba(${rgb},${open ? 0.236 : 0.12})`,
      }}>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 400,
          fontSize: "clamp(18px, 2.4vmin, 22px)",
          color: `rgba(232,228,210,${open ? 0.618 : 0.45})`,
          flex: 1,
          transition: "color 250ms",
        }}>♪ {song.title}</span>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 300,
          fontSize: "clamp(15px, 2vmin, 18px)",
          color: "rgba(232,228,210,0.30)",
        }}>{song.artist}</span>
        <span style={{
          fontSize: "clamp(15px, 1.618vmin, 22px)",
          color: `rgba(${rgb},${open ? 0.618 : 0.236})`,
          transition: `all 250ms ${EASE}`,
          transform: open ? "rotate(180deg)" : "none",
          display: "inline-block", marginLeft: "0.382rem",
        }}>▾</span>
      </div>
      {open && (
        <div style={{
          display: "flex", gap: "0.618rem", padding: "0.618rem 0",
          animation: "fadeIn 382ms ease", flexWrap: "wrap",
        }}>
          {links.map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(13px, 1.618vmin, 16px)",
                letterSpacing: "0.06em",
                color: `rgba(${rgb},0.618)`,
                textDecoration: "none",
                padding: "0.382rem 0.618rem",
                border: `1px solid rgba(${rgb},0.236)`,
                borderRadius: "0.236rem",
                transition: `all 250ms ${EASE}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${rgb},0.618)`;
                e.currentTarget.style.color = `rgba(${rgb},1.0)`;
                e.currentTarget.style.background = `rgba(${rgb},0.08)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `rgba(${rgb},0.236)`;
                e.currentTarget.style.color = `rgba(${rgb},0.618)`;
                e.currentTarget.style.background = "transparent";
              }}
            >{l.label}</a>
          ))}
        </div>
      )}
    </div>
  );
}

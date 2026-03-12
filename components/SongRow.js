"use client";

import { useState } from "react";

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
          fontFamily: "var(--font-body)", fontWeight: 400,
          fontSize: "clamp(1.125rem, 2.4vmin + 0.15rem, 1.375rem)",
          color: `rgba(232,228,210,${open ? 0.85 : 0.65})`,
          flex: 1,
          transition: "color var(--t-base) var(--ease-snap)",
        }}>♪ {song.title}</span>
        <span style={{
          fontFamily: "var(--font-body)", fontWeight: 300,
          fontSize: "clamp(0.938rem, 2vmin + 0.1rem, 1.125rem)",
          color: "rgba(232,228,210,0.45)",
        }}>{song.artist}</span>
        <span style={{
          fontSize: "clamp(0.938rem, 1.618vmin + 0.1rem, 1.375rem)",
          color: `rgba(${rgb},${open ? 0.618 : 0.236})`,
          transition: "all var(--t-base) var(--ease-snap)",
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
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(0.812rem, 1.618vmin + 0.1rem, 1rem)",
                letterSpacing: "0.06em",
                color: `rgba(${rgb},0.618)`,
                textDecoration: "none",
                padding: "0.382rem 0.618rem",
                border: `1px solid rgba(${rgb},0.236)`,
                borderRadius: "0.236rem",
                transition: "all var(--t-base) var(--ease-snap)",
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

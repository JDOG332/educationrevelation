"use client";

export default function SongRow({ song, rgb }) {
  const q = encodeURIComponent(`${song.title} ${song.artist}`);
  const links = [
    { label: "Spotify", url: `https://open.spotify.com/search/${q}` },
    { label: "YouTube", url: `https://music.youtube.com/search?q=${q}` },
    { label: "Apple", url: `https://music.apple.com/search?term=${q}` },
    { label: "Amazon", url: `https://music.amazon.com/search/${q}` },
  ];

  return (
    <div style={{
      padding: "0.618rem 0",
      borderBottom: `1px solid rgba(${rgb},0.08)`,
    }}>
      <div style={{
        display: "flex", alignItems: "baseline", gap: "0.382rem",
        marginBottom: "0.382rem",
      }}>
        <span style={{ fontSize: "0.875rem", color: `rgba(${rgb},0.618)` }}>♪</span>
        <span style={{
          fontFamily: "var(--font-body)", fontWeight: 400,
          fontSize: "clamp(1rem, 2.2vmin + 0.1rem, 1.25rem)",
          color: "rgba(232,228,210,0.82)",
          flex: 1,
        }}>{song.title}</span>
        <span style={{
          fontFamily: "var(--font-body)", fontWeight: 300,
          fontSize: "clamp(0.75rem, 1.4vmin + 0.1rem, 0.875rem)",
          color: "rgba(232,228,210,0.40)",
        }}>{song.artist}</span>
      </div>
      <div style={{
        display: "flex", gap: "0.382rem", flexWrap: "wrap",
        paddingLeft: "1.25rem",
      }}>
        {links.map(l => (
          <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "clamp(0.618rem, 1.1vmin + 0.1rem, 0.75rem)",
              letterSpacing: "0.06em",
              color: `rgba(${rgb},0.55)`,
              textDecoration: "none",
              padding: "0.236rem 0.618rem",
              border: `1px solid rgba(${rgb},0.15)`,
              borderRadius: "100px",
              transition: "all var(--t-base) var(--ease-snap)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `rgba(${rgb},0.618)`;
              e.currentTarget.style.color = `rgba(${rgb},1.0)`;
              e.currentTarget.style.background = `rgba(${rgb},0.08)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `rgba(${rgb},0.15)`;
              e.currentTarget.style.color = `rgba(${rgb},0.55)`;
              e.currentTarget.style.background = "transparent";
            }}
          >{l.label}</a>
        ))}
      </div>
    </div>
  );
}

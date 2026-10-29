import { ImageResponse } from 'next/og';

export const alt = 'Education Revelation: ten doors into human knowledge, and one equation underneath';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Site-wide link preview image, used by every page that has no image of its own.
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: 1200, height: 630, background: '#03030a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#e8e8f0', fontFamily: 'serif' }}>
        <div style={{ width: 0, height: 0, borderLeft: '44px solid transparent', borderRight: '44px solid transparent', borderBottom: '76px solid #C9A84C', marginBottom: 40 }} />
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1, color: '#E8D5A0' }}>Education Revelation</div>
        <div style={{ fontSize: 30, marginTop: 20, color: 'rgba(232,232,240,0.8)' }}>Ten doors into human knowledge. One equation underneath.</div>
        <div style={{ fontSize: 24, marginTop: 48, color: 'rgba(201,168,76,0.9)' }}>Ψ = R₁₂ × G  ·  by Jeff Sellers</div>
      </div>
    ),
    size
  );
}

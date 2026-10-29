import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

// The favicon: a gold triangle on the site's near-black, the tetractys mark.
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: 64, height: 64, background: '#03030a', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
        <div style={{ width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderBottom: '31px solid #C9A84C' }} />
      </div>
    ),
    size
  );
}

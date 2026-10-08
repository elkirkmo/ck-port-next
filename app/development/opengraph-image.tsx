import { ImageResponse } from 'next/og';
import { profile } from '../data/development';

export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// A typographic card in the site's cyan/magenta/yellow palette: no invented imagery.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background:
            'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #ffff00 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            borderRadius: 24,
            padding: '56px 64px',
          }}
        >
          <div style={{ fontSize: 88, fontWeight: 700, color: '#111827' }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 44, color: '#1f2937', marginTop: 12 }}>
            {profile.title}
          </div>
          <div style={{ fontSize: 30, color: '#374151', marginTop: 32 }}>
            TypeScript · React · Python · Go · AI agents
          </div>
          <div style={{ fontSize: 26, color: '#4b5563', marginTop: 12 }}>
            chriskirkham.com/development
          </div>
        </div>
      </div>
    ),
    size
  );
}

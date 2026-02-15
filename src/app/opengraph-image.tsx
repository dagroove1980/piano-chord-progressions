import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Piano Chord Progressions — Master the Keys';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#0a0a0a', // Almost black
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Piano Keys Background Effect */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200, display: 'flex' }}>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                background: i % 2 === 0 ? '#1a1a1a' : '#0a0a0a',
                                borderRight: '1px solid #333',
                            }}
                        />
                    ))}
                </div>

                <div
                    style={{
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 300,
                            color: 'white',
                            letterSpacing: '-0.05em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 20,
                        }}
                    >
                        <span style={{ fontSize: 100 }}>🎹</span>
                        <span>Piano Chords</span>
                    </div>

                    <div
                        style={{
                            fontSize: 40,
                            color: '#888',
                            fontWeight: 300,
                            marginTop: 10,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Progressions
                    </div>

                    <div
                        style={{
                            marginTop: 60,
                            padding: '16px 32px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: 50,
                            color: 'white',
                            fontSize: 24,
                            background: 'rgba(255,255,255,0.05)',
                        }}
                    >
                        Interactive Library
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}

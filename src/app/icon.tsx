import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
    width: 48,
    height: 48,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    background: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 28,
                    borderRadius: 4,
                    border: '1px solid #333',
                }}
            >
                🎹
            </div>
        ),
        {
            ...size,
        }
    );
}

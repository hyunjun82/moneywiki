import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          M
        </span>
      </div>
    ),
    { ...size }
  )
}

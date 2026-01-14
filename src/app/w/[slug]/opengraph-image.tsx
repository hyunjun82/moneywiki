import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  // 슬러그에서 제목 추출 (하이픈을 공백으로 변환)
  const title = decodeURIComponent(params.slug).replace(/-/g, ' ');

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(to bottom right, #064e3b, #10b981)',
          padding: '40px',
        }}
      >
        {/* 카드 박스 (유리 질감 효과) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '30px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            padding: '60px',
            position: 'relative',
          }}
        >
          {/* 상단 장식 아이콘 */}
          <div style={{ fontSize: 80, marginBottom: 20, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>
            💰
          </div>

          {/* 로고 텍스트 */}
          <div
            style={{
              fontSize: 30,
              color: '#a7f3d0',
              fontWeight: 600,
              letterSpacing: '2px',
              marginBottom: 10,
              textTransform: 'uppercase',
            }}
          >
            MONEY WIKI
          </div>

          {/* 메인 제목 */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.1,
              textShadow: '0 4px 10px rgba(0,0,0,0.3)',
              wordBreak: 'keep-all',
            }}
          >
            {title}
          </div>

          {/* 하단 장식 선 */}
          <div
            style={{
              width: '100px',
              height: '6px',
              backgroundColor: '#fbbf24',
              marginTop: 40,
              borderRadius: '3px',
            }}
          />

          {/* 도메인 주소 */}
          <div
            style={{
              position: 'absolute',
              bottom: 30,
              fontSize: 24,
              color: '#d1fae5'
            }}
          >
            www.jjyu.co.kr
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

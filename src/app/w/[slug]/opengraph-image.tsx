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

  // 현재 날짜
  const today = new Date();
  const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0f172a',
          padding: '50px 60px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* 상단 헤더 영역 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          {/* 로고 아이콘 */}
          <div
            style={{
              fontSize: 48,
              marginRight: 16,
            }}
          >
            💰
          </div>
          {/* 로고 텍스트 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: '#fbbf24',
                letterSpacing: '-0.5px',
              }}
            >
              머니위키
            </span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: '#94a3b8',
              }}
            >
              Money Wiki
            </span>
          </div>
        </div>

        {/* 구분선 */}
        <div
          style={{
            width: '100%',
            height: '2px',
            background: 'linear-gradient(to right, #fbbf24, #f59e0b, transparent)',
            marginBottom: '50px',
          }}
        />

        {/* 메인 콘텐츠 영역 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {/* 메인 제목 */}
          <div
            style={{
              fontSize: title.length > 20 ? 64 : 76,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.2,
              letterSpacing: '-1px',
              wordBreak: 'keep-all',
              maxWidth: '100%',
            }}
          >
            {title}
          </div>

          {/* 서브 텍스트 (설명) */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: '#94a3b8',
              marginTop: '24px',
              lineHeight: 1.4,
            }}
          >
            쉽고 정확한 금융·세금·부동산 정보
          </div>
        </div>

        {/* 하단 푸터 영역 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #334155',
            paddingTop: '24px',
          }}
        >
          {/* 날짜 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#22c55e',
              }}
            />
            <span
              style={{
                fontSize: 22,
                color: '#64748b',
                fontWeight: 500,
              }}
            >
              {dateStr}
            </span>
          </div>

          {/* 도메인 */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: '#475569',
              letterSpacing: '0.5px',
            }}
          >
            WWW.JJYU.CO.KR
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

'use client';

import Link from 'next/link';

// 뉴스 티커 텍스트 (흐르는 문장)
const tickerMessages = [
  { text: '2026년 정부지원금 마감 임박', link: '/category/정부지원금' },
  { text: '내 숨은 환급금 조회하기', link: '/w/근로장려금' },
  { text: '청년 월세 지원 조건 확인', link: '/w/청년월세지원' },
  { text: '실업급여 수급자격 바로 확인', link: '/w/실업급여' },
  { text: '육아휴직 급여 계산하기', link: '/w/육아휴직-급여' },
  { text: '2026 연말정산 환급 꿀팁', link: '/w/연말정산' },
  { text: '기초연금 수급 자격 확인', link: '/w/기초연금' },
  { text: '출산지원금 최대 200만원 받기', link: '/w/출산지원금' },
];

export default function MarqueeBanner() {
  // 티커 텍스트 생성 (• 구분자로 연결)
  const TickerContent = () => (
    <>
      {tickerMessages.map((item, index) => (
        <span key={index} className="inline-flex items-center">
          <Link
            href={item.link}
            className="hover:text-[#00C896] transition-colors"
          >
            {item.text}
          </Link>
          <span className="mx-6 text-gray-500">•</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="bg-[#222] overflow-hidden h-10">
      <div className="relative flex overflow-hidden h-full items-center whitespace-nowrap">
        {/* 첫 번째 콘텐츠 */}
        <div className="animate-marquee-rtl inline-flex items-center text-white text-sm">
          <TickerContent />
        </div>
        {/* 복제된 콘텐츠 (무한 반복용) */}
        <div className="animate-marquee-rtl inline-flex items-center text-white text-sm" aria-hidden="true">
          <TickerContent />
        </div>
      </div>
    </div>
  );
}

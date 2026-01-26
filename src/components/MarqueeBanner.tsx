'use client';

import Link from 'next/link';

// 지원금/정책 관련 키워드 (클릭 시 해당 페이지로 이동)
const policyKeywords = [
  { label: '청년도약계좌', slug: '청년도약계좌' },
  { label: '근로장려금', slug: '근로장려금' },
  { label: '자녀장려금', slug: '자녀장려금' },
  { label: '실업급여', slug: '실업급여' },
  { label: '육아휴직급여', slug: '육아휴직-급여' },
  { label: '출산지원금', slug: '출산지원금' },
  { label: '주거급여', slug: '주거급여' },
  { label: '기초연금', slug: '기초연금' },
  { label: '국민연금', slug: '국민연금' },
  { label: '청년월세지원', slug: '청년월세지원' },
  { label: '에너지바우처', slug: '에너지바우처' },
  { label: '긴급복지지원', slug: '긴급복지지원' },
];

export default function MarqueeBanner() {
  const KeywordPills = () => (
    <>
      {policyKeywords.map((keyword, index) => (
        <Link
          key={`${keyword.slug}-${index}`}
          href={`/w/${keyword.slug}`}
          className="inline-flex items-center px-3 py-1 bg-white/80 rounded text-sm text-[#007A5C] hover:bg-white hover:text-[#00C896] transition-colors whitespace-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          {keyword.label}
        </Link>
      ))}
    </>
  );

  return (
    <div className="bg-[#333333] overflow-hidden h-10">
      <div className="relative flex overflow-hidden h-full items-center">
        {/* 첫 번째 콘텐츠 */}
        <div className="animate-marquee-rtl whitespace-nowrap flex items-center gap-6 pl-6">
          <KeywordPills />
        </div>
        {/* 복제된 콘텐츠 (무한 반복용) */}
        <div className="animate-marquee-rtl whitespace-nowrap flex items-center gap-6 pl-6" aria-hidden="true">
          <KeywordPills />
        </div>
      </div>
    </div>
  );
}

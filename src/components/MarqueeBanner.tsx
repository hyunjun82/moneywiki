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
          className="inline-flex items-center px-4 py-1.5 bg-white border border-yellow-300 rounded-full text-sm font-medium text-gray-700 hover:bg-yellow-200 hover:border-yellow-400 transition-colors whitespace-nowrap shadow-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {keyword.label}
        </Link>
      ))}
    </>
  );

  return (
    <div className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 border-y border-yellow-200 overflow-hidden">
      <div className="relative flex overflow-hidden">
        {/* 첫 번째 콘텐츠 */}
        <div className="animate-marquee-rtl whitespace-nowrap py-3 flex items-center gap-3 pl-4">
          <KeywordPills />
        </div>
        {/* 복제된 콘텐츠 (무한 반복용) */}
        <div className="animate-marquee-rtl whitespace-nowrap py-3 flex items-center gap-3 pl-4" aria-hidden="true">
          <KeywordPills />
        </div>
      </div>
    </div>
  );
}

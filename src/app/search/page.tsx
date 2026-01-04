'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

// 샘플 검색 결과 (나중에 API로 대체)
const sampleSearchResults = [
  {
    title: '대한민국',
    slug: '대한민국',
    excerpt: '대한민국(大韓民國, Republic of Korea)은 동아시아의 한반도 남부에 위치한 민주공화국이다...',
    category: ['국가', '동아시아'],
    lastModified: '2025-01-04',
  },
  {
    title: '손흥민',
    slug: '손흥민',
    excerpt: '손흥민(孫興慜, 1992년 7월 8일 ~ )은 대한민국의 축구 선수이다. 현재 잉글랜드 프리미어리그 토트넘 홋스퍼 FC에서 뛰고 있다...',
    category: ['인물', '축구선수'],
    lastModified: '2025-01-04',
  },
  {
    title: '비트코인',
    slug: '비트코인',
    excerpt: '비트코인(Bitcoin)은 2009년 사토시 나카모토가 만든 가상화폐이다. 블록체인 기술을 기반으로 한다...',
    category: ['암호화폐', 'IT'],
    lastModified: '2025-01-03',
  },
  {
    title: 'ChatGPT',
    slug: 'ChatGPT',
    excerpt: 'ChatGPT는 OpenAI가 개발한 대규모 언어 모델 기반 챗봇이다. 2022년 11월에 출시되어 큰 화제를 모았다...',
    category: ['AI', 'IT'],
    lastModified: '2025-01-02',
  },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // 검색 결과 필터링 (실제로는 API 호출)
  const results = query
    ? sampleSearchResults.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query.toLowerCase()) ||
          doc.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* 메인 콘텐츠 */}
        <div className="flex-1 min-w-0">
          {/* 검색 헤더 */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              🔍 검색 결과: &quot;{query}&quot;
            </h1>
            <p className="text-gray-500 text-sm">
              {results.length > 0
                ? `총 ${results.length}개의 문서를 찾았습니다.`
                : query
                ? '검색 결과가 없습니다.'
                : '검색어를 입력해주세요.'}
            </p>
          </div>

          {/* 광고 슬롯 - 상단 */}
          <div className="bg-gray-100 border border-dashed border-gray-300 rounded p-3 text-center mb-6">
            <span className="text-gray-400 text-sm">📢 광고 영역</span>
          </div>

          {/* 검색 결과 목록 */}
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result) => (
                <div
                  key={result.slug}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:border-[#87ceab] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Link
                      href={`/w/${encodeURIComponent(result.slug)}`}
                      className="text-lg font-medium text-blue-600 hover:underline"
                    >
                      {result.title}
                    </Link>
                    <span className="text-xs text-gray-400">
                      {result.lastModified}
                    </span>
                  </div>

                  {/* 카테고리 */}
                  <div className="flex gap-1 mb-2">
                    {result.category.map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* 발췌문 */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {result.excerpt}
                  </p>
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-xl font-bold mb-2">검색 결과가 없습니다</h2>
              <p className="text-gray-500 mb-4">
                &quot;{query}&quot;에 대한 문서를 찾을 수 없습니다.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>다음을 시도해 보세요:</p>
                <ul className="list-disc list-inside">
                  <li>다른 검색어를 사용해 보세요</li>
                  <li>더 일반적인 단어를 사용해 보세요</li>
                  <li>맞춤법을 확인해 보세요</li>
                </ul>
              </div>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-block px-4 py-2 bg-[#87ceab] text-white rounded hover:bg-[#5fad80] transition-colors"
                >
                  대문으로 돌아가기
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-xl font-bold mb-2">검색어를 입력하세요</h2>
              <p className="text-gray-500">
                위키 문서를 검색하려면 검색어를 입력해주세요.
              </p>
            </div>
          )}

          {/* 광고 슬롯 - 하단 */}
          <div className="bg-gray-100 border border-dashed border-gray-300 rounded p-3 text-center mt-6">
            <span className="text-gray-400 text-sm">📢 광고 영역</span>
          </div>
        </div>

        {/* 사이드바 */}
        <Sidebar />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">로딩 중...</div>}>
      <SearchContent />
    </Suspense>
  );
}

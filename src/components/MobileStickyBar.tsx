'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 스크롤 내릴 때 숨기기, 올릴 때 보이기 (선택적)
      // 현재는 항상 보이게 설정
      setIsVisible(true);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!isVisible) return null;

  return (
    <>
      {/* 모바일 스티키 바가 차지하는 공간 확보 */}
      <div className="md:hidden" style={{ height: '70px' }} />

      {/* 모바일 스티키 바 (기존 스타일 유지) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <Link
          href="/w/미환급금-조회"
          className="flex items-center justify-between w-full px-4 py-4"
          style={{
            backgroundColor: '#191F28',
            minHeight: '70px',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.3)'
          }}
        >
          <div className="flex-1">
            <h3 className="font-bold text-white text-base leading-tight">
              30초 안에 내 숨은 환급금 찾기
            </h3>
            <p className="text-sm mt-1" style={{ color: '#B0B8C1' }}>
              무료
            </p>
          </div>
          <button
            className="flex items-center gap-1 rounded-full px-6 py-3 font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            style={{
              backgroundColor: '#FFEB3B',
              color: '#333333'
            }}
          >
            <span>조회하기</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>

      {/* PC 스티키 바 - 바닥 고정, 본문 영역 내에서만 */}
      <div
        className="hidden lg:block fixed bottom-0 z-40"
        style={{
          left: 'max(1rem, calc((100vw - 1280px) / 2 + 1rem))',
          right: 'calc(288px + 2rem + max(1rem, (100vw - 1280px) / 2))',
          maxWidth: 'calc(1280px - 288px - 4rem)'
        }}
      >
        <Link
          href="/w/미환급금-조회"
          className="flex items-center justify-between w-full px-5 py-3"
          style={{
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        >
          <span className="px-3 py-1 bg-white text-emerald-700 rounded-full text-xs font-bold">
            평균 13만원 환급
          </span>
          <span className="flex-1 text-center font-bold text-white text-sm">
            30초 안에 내 숨은 환급금 찾기
          </span>
          <span className="font-bold text-white text-sm">
            조회하기 →
          </span>
        </Link>
      </div>
    </>
  );
}

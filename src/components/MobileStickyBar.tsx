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
      {/* Pulse 애니메이션 */}
      <style jsx>{`
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 235, 59, 0.7); }
          50% { transform: scale(1.02); box-shadow: 0 0 0 8px rgba(255, 235, 59, 0); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
      `}</style>

      {/* 스티키 바가 차지하는 공간 확보 (모바일만) */}
      <div className="h-14 md:hidden" />

      {/* 스티키 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* 그라데이션 그림자 효과 */}
        <div className="absolute -top-4 left-0 right-0 h-4 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

        <Link
          href="/w/미환급금-조회"
          className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <div className="flex flex-col">
              <span className="text-sm font-bold">내 숨은 환급금 찾기</span>
              <span className="text-xs text-blue-200">평균 15만원 · 무료</span>
            </div>
          </div>
          <div
            className="animate-pulse-soft flex items-center gap-1 rounded-full px-4 py-2 font-bold text-sm"
            style={{ backgroundColor: '#FFEB3B', color: '#333333' }}
          >
            <span>조회하기</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
      </div>
    </>
  );
}

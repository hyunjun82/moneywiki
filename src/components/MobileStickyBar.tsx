'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface MobileStickyBarProps {
  text?: string
  amount?: string
  href?: string
  badgeText?: string
}

export default function MobileStickyBar({
  text = '30초 안에 내 숨은 환급금 찾기',
  amount = '평균 13만원 환급',
  href = '/w/미환급금-조회',
  badgeText = '무료'
}: MobileStickyBarProps) {
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
          href={href}
          className="flex items-center justify-between w-full px-4 py-4"
          style={{
            backgroundColor: '#191F28',
            minHeight: '70px',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.3)'
          }}
        >
          <div className="flex-1">
            <h3 className="font-bold text-white text-base leading-tight">
              {text}
            </h3>
            <p className="text-sm mt-1" style={{ color: '#B0B8C1' }}>
              {badgeText}
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
          left: 'max(1rem, calc((100vw - 720px) / 2))',
          right: 'max(1rem, calc((100vw - 720px) / 2))',
          maxWidth: '720px'
        }}
      >
        <Link
          href={href}
          className="flex items-center justify-between w-full px-5 py-3"
          style={{
            background: 'linear-gradient(135deg, #1E3A5F 0%, #2B5280 100%)',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          }}
        >
          <span className="flex-1 flex items-center justify-start">
            <span className="px-3 py-1 bg-white text-[#1E3A5F] rounded-full text-xs font-bold">
              {amount}
            </span>
          </span>
          <span className="flex-1 text-center font-bold text-white text-sm">
            {text}
          </span>
          <span className="flex-1 font-bold text-white text-sm text-right">
            조회하기 →
          </span>
        </Link>
      </div>
    </>
  );
}

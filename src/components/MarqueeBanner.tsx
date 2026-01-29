'use client';

import Link from 'next/link';

export default function MarqueeBanner() {
  return (
    <div className="w-full bg-[#1a1a1a] text-white h-12 overflow-hidden flex items-center relative">
      {/* 왼쪽 라벨 (고정) */}
      <div className="bg-[#00C896] h-full px-4 flex items-center justify-center font-bold text-sm shrink-0 z-10 shadow-lg">
        놓치면 손해
      </div>

      {/* 흐르는 텍스트 영역 (Marquee) */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: 'marquee-scroll 20s linear infinite',
          }}
        >
          {/* 내용 세트 1 - 3개 핵심 항목 */}
          <span className="mx-8 text-sm font-bold inline-flex items-center gap-2 text-[#FFD700]">
            <Link href="/w/미환급금-조회" className="hover:text-white transition-colors flex items-center gap-2">
              💰 내 숨은 환급금 찾기 <span className="text-xs bg-red-500 px-1.5 py-0.5 rounded text-white animate-pulse">HOT</span>
            </Link>
          </span>
          <span className="text-gray-600">•</span>
          <span className="mx-8 text-sm font-bold inline-flex items-center gap-2">
            <Link href="/category/정부지원금" className="hover:text-[#00C896] transition-colors flex items-center gap-2">
              🎁 2026 정부지원금 총정리 <span className="text-xs text-[#00C896]">30개+</span>
            </Link>
          </span>
          <span className="text-gray-600">•</span>
          <span className="mx-8 text-sm font-bold inline-flex items-center gap-2">
            <Link href="/w/2026년-달라지는-제도" className="hover:text-[#00C896] transition-colors flex items-center gap-2">
              📋 2026년 달라지는 제도 <span className="text-xs text-yellow-400">NEW</span>
            </Link>
          </span>
          <span className="text-gray-600">•</span>

          {/* 내용 세트 2 (무한 반복용 복제) */}
          <span className="mx-8 text-sm font-bold inline-flex items-center gap-2 text-[#FFD700]">
            <Link href="/w/미환급금-조회" className="hover:text-white transition-colors flex items-center gap-2">
              💰 내 숨은 환급금 찾기 <span className="text-xs bg-red-500 px-1.5 py-0.5 rounded text-white animate-pulse">HOT</span>
            </Link>
          </span>
          <span className="text-gray-600">•</span>
          <span className="mx-8 text-sm font-bold inline-flex items-center gap-2">
            <Link href="/category/정부지원금" className="hover:text-[#00C896] transition-colors flex items-center gap-2">
              🎁 2026 정부지원금 총정리 <span className="text-xs text-[#00C896]">30개+</span>
            </Link>
          </span>
          <span className="text-gray-600">•</span>
          <span className="mx-8 text-sm font-bold inline-flex items-center gap-2">
            <Link href="/w/2026년-달라지는-제도" className="hover:text-[#00C896] transition-colors flex items-center gap-2">
              📋 2026년 달라지는 제도 <span className="text-xs text-yellow-400">NEW</span>
            </Link>
          </span>
          <span className="text-gray-600">•</span>
        </div>
      </div>

      {/* 인라인 스타일 태그로 애니메이션 강제 정의 */}
      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import Link from 'next/link';

export default function MarqueeBanner() {
  return (
    <div className="w-full bg-[#1a1a1a] text-white h-12 overflow-hidden flex items-center relative">
      {/* 왼쪽 라벨 (고정) */}
      <div className="bg-[#00C896] h-full px-4 flex items-center justify-center font-bold text-sm shrink-0 z-10 shadow-lg">
        머니위키 NOW
      </div>

      {/* 흐르는 텍스트 영역 (Marquee) - 인라인 스타일로 강제 애니메이션 */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: 'marquee-scroll 25s linear infinite',
          }}
        >
          {/* 내용 세트 1 */}
          <span className="mx-6 text-sm font-medium inline-flex items-center gap-2">
            <Link href="/category/정부지원금" className="hover:text-[#00C896] transition-colors">
              📢 2026년 정부지원금 신청 마감 임박
            </Link>
          </span>
          <span className="text-gray-500">|</span>
          <span className="mx-6 text-sm font-medium inline-flex items-center gap-2 text-[#00C896]">
            <Link href="/w/근로장려금" className="hover:text-white transition-colors">
              💰 내 숨은 환급금 1분 조회
            </Link>
          </span>
          <span className="text-gray-500">|</span>
          <span className="mx-6 text-sm font-medium inline-flex items-center gap-2">
            <Link href="/w/청년월세지원" className="hover:text-[#00C896] transition-colors">
              🏠 청년 월세 지원 조건 완화
            </Link>
          </span>
          <span className="text-gray-500">|</span>
          <span className="mx-6 text-sm font-medium inline-flex items-center gap-2">
            <Link href="/w/실업급여-계산기" className="hover:text-[#00C896] transition-colors">
              📊 실업급여 계산기 인기
            </Link>
          </span>
          <span className="text-gray-500">|</span>
          <span className="mx-6 text-sm font-medium inline-flex items-center gap-2">
            <Link href="/w/퇴직금-계산기" className="hover:text-[#00C896] transition-colors">
              💵 퇴직금 계산기 바로가기
            </Link>
          </span>
          <span className="text-gray-500">|</span>

          {/* 내용 세트 2 (무한 반복용 복제) */}
          <span className="mx-6 text-sm font-medium inline-flex items-center gap-2">
            <Link href="/category/정부지원금" className="hover:text-[#00C896] transition-colors">
              📢 2026년 정부지원금 신청 마감 임박
            </Link>
          </span>
          <span className="text-gray-500">|</span>
          <span className="mx-6 text-sm font-medium inline-flex items-center gap-2 text-[#00C896]">
            <Link href="/w/근로장려금" className="hover:text-white transition-colors">
              💰 내 숨은 환급금 1분 조회
            </Link>
          </span>
          <span className="text-gray-500">|</span>
          <span className="mx-6 text-sm font-medium inline-flex items-center gap-2">
            <Link href="/w/청년월세지원" className="hover:text-[#00C896] transition-colors">
              🏠 청년 월세 지원 조건 완화
            </Link>
          </span>
          <span className="text-gray-500">|</span>
          <span className="mx-6 text-sm font-medium inline-flex items-center gap-2">
            <Link href="/w/실업급여-계산기" className="hover:text-[#00C896] transition-colors">
              📊 실업급여 계산기 인기
            </Link>
          </span>
          <span className="text-gray-500">|</span>
          <span className="mx-6 text-sm font-medium inline-flex items-center gap-2">
            <Link href="/w/퇴직금-계산기" className="hover:text-[#00C896] transition-colors">
              💵 퇴직금 계산기 바로가기
            </Link>
          </span>
          <span className="text-gray-500">|</span>
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

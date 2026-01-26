'use client';

export default function MarqueeBanner() {
  return (
    <div className="bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-100 border-y border-yellow-200 overflow-hidden">
      <div className="relative flex">
        <div className="animate-marquee whitespace-nowrap py-3 flex items-center gap-12">
          <span className="text-sm font-medium text-gray-800">
            📢 <span className="font-bold text-yellow-800">[긴급]</span> 2026년 바뀌는 정부지원금 총정리
          </span>
          <span className="text-sm font-medium text-gray-800">
            💰 <span className="font-bold text-yellow-800">내가 받을 수 있는 숨은 돈</span> 1분 조회하기
          </span>
          <span className="text-sm font-medium text-gray-800">
            🎯 <span className="font-bold text-yellow-800">놓치면 후회하는</span> 정부 지원금 확인
          </span>
          <span className="text-sm font-medium text-gray-800">
            ⚡ <span className="font-bold text-yellow-800">신청 마감 임박!</span> 지금 바로 확인하세요
          </span>
        </div>
        {/* 복제된 콘텐츠 (무한 반복용) */}
        <div className="animate-marquee whitespace-nowrap py-3 flex items-center gap-12 absolute top-0" aria-hidden="true">
          <span className="text-sm font-medium text-gray-800">
            📢 <span className="font-bold text-yellow-800">[긴급]</span> 2026년 바뀌는 정부지원금 총정리
          </span>
          <span className="text-sm font-medium text-gray-800">
            💰 <span className="font-bold text-yellow-800">내가 받을 수 있는 숨은 돈</span> 1분 조회하기
          </span>
          <span className="text-sm font-medium text-gray-800">
            🎯 <span className="font-bold text-yellow-800">놓치면 후회하는</span> 정부 지원금 확인
          </span>
          <span className="text-sm font-medium text-gray-800">
            ⚡ <span className="font-bold text-yellow-800">신청 마감 임박!</span> 지금 바로 확인하세요
          </span>
        </div>
      </div>
      {/* 클릭 가능한 오버레이 */}
      <a
        href="/category/정부지원금"
        className="absolute inset-0 cursor-pointer"
        aria-label="정부지원금 페이지로 이동"
      />
    </div>
  );
}

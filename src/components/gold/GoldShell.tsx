"use client";

import { usePathname } from "next/navigation";

/**
 * 금 섹션 바탕색. 허브(/gold)는 목업 v2 대로 흰 바탕, 나머지 페이지는 기존 베이지(#EFEDE8).
 * 레이아웃은 서버 컴포넌트라 경로를 모르므로 이 얇은 클라이언트 껍데기가 정한다.
 */
export default function GoldShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHub = (pathname?.replace(/\/$/, "") || "/gold") === "/gold";
  return (
    <div className={`${isHub ? "bg-white" : "bg-[#EFEDE8]"} min-h-screen`}>
      {children}
    </div>
  );
}

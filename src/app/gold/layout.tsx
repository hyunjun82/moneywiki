import type { Metadata } from "next";
import GoldNav from "@/components/gold/GoldNav";

/**
 * 금 섹션 공통 껍데기.
 *
 * 루트 layout.tsx 안에 중첩된다 — 루트는 건드리지 않는다.
 * 배경·타이포는 이 트리 안에서만 적용되므로 /w/ 글 2,138개에 영향이 없다.
 */

export const metadata: Metadata = {
  title: {
    default: "금시세",
    template: "%s | 머니위키",
  },
};

export default function GoldLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#EFEDE8] min-h-screen">
      <GoldNav />
      <div className="max-w-[1120px] mx-auto px-4 sm:px-8 pb-16">{children}</div>
    </div>
  );
}

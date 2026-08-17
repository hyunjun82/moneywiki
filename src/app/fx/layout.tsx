import type { Metadata } from "next";
import FxNav from "@/components/fx/FxNav";

/**
 * 환율노트 섹션 껍데기.
 *
 * 루트 layout.tsx 안에 중첩된다 — 루트는 건드리지 않는다.
 * 배경·타이포가 이 트리 안에서만 적용되므로 /w/ 글에 영향이 없다.
 */

export const metadata: Metadata = {
  title: {
    default: "환율",
    template: "%s | 머니위키",
  },
};

export default function FxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#EFEDE8] min-h-screen">
      <FxNav />
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 pb-16 overflow-x-hidden">{children}</div>
    </div>
  );
}

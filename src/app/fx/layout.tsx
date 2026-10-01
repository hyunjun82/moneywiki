import type { Metadata } from "next";
import FxNav from "@/components/fx/FxNav";
import { loadFx } from "@/components/fx/snapshot";
import type { FxData } from "@/components/fx/fxCore";

/**
 * 환율노트 섹션 껍데기.
 *
 * 루트 layout.tsx 안에 중첩된다 — 루트는 건드리지 않는다.
 * 배경·타이포가 이 트리 안에서만 적용되므로 /w/ 글에 영향이 없다.
 * 상단 통화 바로가기 띠(FxNav)는 빌드 때 스냅숏으로 그린다 — 모든 /fx 페이지 첫 HTML 에 통화 15종 링크가 있다.
 */

export const metadata: Metadata = {
  title: {
    default: "환율",
    template: "%s | 머니위키",
  },
};

/** 띠에 필요한 것만 넘긴다(이력·은행 공시 빼고) — 모든 /fx 페이지 HTML 에 실린다 */
function navSnapshot(): FxData | null {
  try {
    const d = loadFx();
    return { updatedAt: d.updatedAt, rates: (d.rates ?? []).map(({ history: _h, ...r }) => r) };
  } catch {
    return null;
  }
}

export default function FxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#EFEDE8] min-h-screen">
      <FxNav initial={navSnapshot()} />
      <div className="max-w-[1180px] mx-auto px-4 sm:px-8 pb-16 overflow-x-hidden">{children}</div>
    </div>
  );
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "간주임대료 계산 2026년 이자율 3.1% 공식 | 머니위키",
  description: "간주임대료 = (보증금 합계 - 3억원) × 60% × 3.1%. 보증금 10억원이면 연 1,302만원. 2주택 계산과 과세 대상 요건까지 정리.",
  openGraph: {
    title: "간주임대료 계산 방법과 2026년 이자율 3.1% 적용",
    description: "3억원 공제 후 60%에 3.1% 곱하면 돼요. 보증금별 금액표와 2주택 계산 예시.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

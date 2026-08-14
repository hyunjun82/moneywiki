import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2주택자 임대소득세 2026년 변경 전세보증금 간주임대료 과세",
  description: "2026년부터 기준시가 12억 초과 2주택자, 보증금 합계 12억 초과 시 간주임대료 과세. 계산 예시와 사업자 등록 의무 정리.",
  openGraph: {
    title: "2026년 2주택자 전세보증금 간주임대료 과세 조건",
    description: "기준시가 12억 초과 2채 + 보증금 합계 12억 초과 시 세금 발생. 계산 예시 정리.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

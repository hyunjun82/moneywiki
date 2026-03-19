import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고령자 재취업 지원금 신청 방법 | 머니위키",
  description: "50세 이상 직무 교육 훈련수당 월 150만원, 정년 후 고용안정지원금 월 30~40만원 신청 방법. 고용24 신청부터 환수 주의사항까지.",
  openGraph: {
    title: "고령자 재취업 지원금 신청 방법",
    description: "훈련수당 월 150만원 + 고용안정지원금 월 40만원. 50세 이상 신청 절차 정리.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

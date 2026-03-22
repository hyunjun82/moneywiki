import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "월급에서 세금 얼마나 떼나? 2026년 4대보험 요율과 실수령액 계산 | 머니위키",
  description: "2026년 4대보험 본인 부담분은 월급의 약 9.7%예요. 국민연금 4.75%, 건강보험 3.595%, 고용보험 0.9%. 월급 300만원·500만원·700만원 실수령액 비교.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/월급별-세금-계산",
  },
  openGraph: {
    title: "월급에서 세금 얼마나 떼나? 2026년 4대보험 요율과 실수령액 계산",
    description: "300만원은 약 265만원, 500만원은 약 430만원, 700만원은 약 600만원. 2026년 기준.",
    url: "https://www.jjyu.co.kr/w/월급별-세금-계산",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "4대보험, 내 월급에서 얼마나 빠지나요? 2026년 보험료율과 계산법",
  description: "2026년 직장인 4대보험 본인 부담은 월급의 약 9.7%예요. 국민연금 4.75%, 건강보험 3.595%, 고용보험 0.9%. 올해 국민연금이 9.5%로 인상됐고 2033년까지 13%로 올라요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/4대보험",
  },
  openGraph: {
    title: "4대보험, 내 월급에서 얼마나 빠지나요? 2026년 보험료율과 계산법",
    description: "국민연금 4.75%, 건강보험 3.595%, 고용보험 0.9%. 월급 300만원이면 약 29만원 공제.",
    url: "https://www.jjyu.co.kr/w/4대보험",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

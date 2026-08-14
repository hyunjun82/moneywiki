import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고용보험료, 내 월급에서 얼마가 빠지나요? 2026년 요율과 계산법",
  description: "2026년 고용보험료 요율은 근로자 0.9%, 사업주 0.9%예요. 월급 300만원이면 매달 27,000원이 공제돼요. 사업장 규모별 추가 부담과 보수총액 기준까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/고용보험료",
  },
  openGraph: {
    title: "고용보험료, 내 월급에서 얼마가 빠지나요? 2026년 요율과 계산법",
    description: "근로자 0.9%, 사업주 0.9%. 월급 300만원 기준 27,000원 공제.",
    url: "https://www.jjyu.co.kr/w/고용보험료",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

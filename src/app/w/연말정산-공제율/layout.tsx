import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 공제율, 항목별로 얼마? 소득공제·세액공제 한눈에 | 머니위키",
  description: "신용카드 15%, 체크카드 30%, 전통시장 40%. 보험료 12%, 의료비 15%, 연금저축 16.5%. 2026년 연말정산 항목별 공제율을 비교했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-공제율" },
  openGraph: {
    title: "연말정산 공제율, 항목별로 얼마? 소득공제·세액공제 한눈에 | 머니위키",
    description: "신용카드 15%, 체크카드 30%, 전통시장 40%. 보험료 12%, 의료비 15%, 연금저축 16.5%. 2026년 연말정산 항목별 공제율을 비교했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-공제율",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

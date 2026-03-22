import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 최저임금 미달이면? 신고 방법과 처벌 기준 | 머니위키",
  description: "2026년 최저임금은 시급 10,320원, 월급 약 216만원이에요. 미달이면 고용노동부에 신고할 수 있고 사업주는 형사처벌 대상이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/최저임금-미달-업종별-기준-신고" },
  openGraph: {
    title: "2026년 최저임금 미달이면? 신고 방법과 처벌 기준 | 머니위키",
    description: "2026년 최저임금은 시급 10,320원, 월급 약 216만원이에요. 미달이면 고용노동부에 신고할 수 있고 사업주는 형사처벌 대상이에요.",
    url: "https://www.jjyu.co.kr/w/최저임금-미달-업종별-기준-신고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

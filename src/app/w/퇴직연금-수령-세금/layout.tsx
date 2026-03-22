import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 수령 세금, 일시금 vs 연금 비교와 절세법 | 머니위키",
  description: "일시금 퇴직소득세 5~15%, 연금소득세 3.3~5.5%. 2026년부터 연금 감면이 확대됐어요. 수령 방법별 세금 비교와 절세 전략을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-수령-세금" },
  openGraph: {
    title: "퇴직연금 수령 세금, 일시금 vs 연금 비교와 절세법 | 머니위키",
    description: "일시금 퇴직소득세 5~15%, 연금소득세 3.3~5.5%. 2026년부터 연금 감면이 확대됐어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-수령-세금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "양도소득세 취득가액 인정 범위, 증빙 방법과 환산취득가액 | 머니위키",
  description: "양도소득세 취득가액에 포함되는 항목(매수가·부대비용·자본적 지출)과 증빙 방법, 환산취득가액 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/양도소득세-취득가액-인정" },
  openGraph: {
    title: "양도소득세 취득가액 인정 범위, 증빙 방법과 환산취득가액 | 머니위키",
    description: "양도소득세 취득가액에 포함되는 항목과 증빙 방법, 환산취득가액 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/양도소득세-취득가액-인정",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

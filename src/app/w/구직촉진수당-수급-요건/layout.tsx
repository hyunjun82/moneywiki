import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "구직촉진수당 수급 요건, 조기 재취업 시 얼마 받나 | 머니위키",
  description: "실업급여 수급 중 조기 재취업하면 남은 급여의 50%를 일시금으로 받을 수 있어요. 수급 요건과 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/구직촉진수당-수급-요건" },
  openGraph: { title: "구직촉진수당 수급 요건, 조기 재취업 시 얼마 받나 | 머니위키", description: "실업급여 수급 중 조기 재취업하면 남은 급여의 50%를 일시금으로 받을 수 있어요.", url: "https://www.jjyu.co.kr/w/구직촉진수당-수급-요건", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

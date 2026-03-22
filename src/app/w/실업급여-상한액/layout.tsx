import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "2026년 실업급여 상한액 일 68,100원, 월 204만원 계산법 | 머니위키",
  description: "2026년 실업급여 상한액 일 68,100원, 하한액 일 64,192원. 6년 만에 인상. 수급액 계산기와 수급 기간을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-상한액" },
  openGraph: { title: "2026년 실업급여 상한액 일 68,100원 | 머니위키", description: "2026년 실업급여 상한액 일 68,100원, 하한액 일 64,192원. 6년 만에 인상.", url: "https://www.jjyu.co.kr/w/실업급여-상한액", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

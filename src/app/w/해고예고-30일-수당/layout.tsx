import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "해고예고 30일·예고수당 계산·미통보 대응·지급 기준 | 머니위키",
  description: "해고 30일 전에 통보 못 받으면 예고수당 받을 수 있어요. 해고예고 수당 계산법과 미지급 신고 방법 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/해고예고-30일-수당" },
  openGraph: { title: "해고예고 30일·예고수당 계산·미통보 대응·지급 기준 | 머니위키", description: "해고 30일 전에 통보 못 받으면 예고수당 받을 수 있어요. 해고예고 수당 계산법과 미지급 신고 방법 알려드려요.", url: "https://www.jjyu.co.kr/w/해고예고-30일-수당", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

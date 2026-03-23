import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 자녀 세액공제 | 머니위키",
  description: "자녀 1명당 25만원, 2명이면 55만원 바로 돌려받아요. 2025년부터 1명당 10만원씩 올랐어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-자녀-세액공제" },
  openGraph: { title: "연말정산 자녀 세액공제 | 머니위키", description: "자녀 1명당 25만원, 2명이면 55만원 바로 돌려받아요. 2025년부터 1명당 10만원씩 올랐어요", url: "https://www.jjyu.co.kr/w/연말정산-자녀-세액공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

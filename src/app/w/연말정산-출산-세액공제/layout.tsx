import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "출산하면 연말정산에서 얼마 돌려받나? 출산 세액공제와 자녀공제",
  description: "출산하면 연말정산에서 얼마 돌려받나? 출산 세액공제와 자녀공제에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-출산-세액공제" },
  openGraph: { title: "출산하면 연말정산에서 얼마 돌려받나? 출산 세액공제와 자녀공제", description: "출산하면 연말정산에서 얼마 돌려받나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-출산-세액공제", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

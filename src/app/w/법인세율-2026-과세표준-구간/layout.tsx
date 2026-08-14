import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "법인세율 , 과세표준 구간별 소득금액 기준",
  description: "2026년부터 법인세율이 인상되어요. 소득금액별 과세표준 구간과 적용 세율을 알려드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/법인세율-2026-과세표준-구간" },
  openGraph: {
    title: "법인세율 , 과세표준 구간별 소득금액 기준",
    description: "2026년부터 법인세율이 인상되어요. 소득금액별 과세표준 구간과 적용 세율을 알려드릴게요.",
    url: "https://www.jjyu.co.kr/w/법인세율-2026-과세표준-구간",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

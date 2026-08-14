import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "공공임대주택, 종류가 왜 이렇게 많죠? 유형별 비교",
  description: "영구임대, 국민임대, 행복주택, 장기전세, 통합공공임대까지. 유형별 소득 기준, 임대료, 거주 기간 비교.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공공임대주택-종류-차이" },
  openGraph: { title: "공공임대주택 유형별 비교", description: "영구·국민·행복·장기전세 차이와 소득 기준.", url: "https://www.jjyu.co.kr/w/공공임대주택-종류-차이", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

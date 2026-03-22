import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 수익률 비교 | 머니위키",
  description: "퇴직연금 수익률 비교해드려요. 금융사별 수익률 차이가 크니까 잘 선택해야 해요. 수익률 조회 방법도 알려드릴게요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-수익률-비교" },
  openGraph: { title: "퇴직연금 수익률 비교 | 머니위키", description: "퇴직연금 수익률 비교해드려요. 금융사별 수익률 차이가 크니까 잘 선택해야 해요. 수익률 조회 방법도 알려드릴게요", url: "https://www.jjyu.co.kr/w/퇴직연금-수익률-비교", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

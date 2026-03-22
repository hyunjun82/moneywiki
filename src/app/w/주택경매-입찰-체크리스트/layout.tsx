import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주택 경매 입찰 전 확인할 것들, 서류부터 보증금까지 | 머니위키",
  description: "등기부등본·매각물건명세서·현황조사서 분석법과 현장 체크포인트, 보증금 준비부터 낙찰 후 절차까지 경매 초보자를 위한 체크리스트예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택경매-입찰-체크리스트" },
  openGraph: {
    title: "주택 경매 입찰 전 확인할 것들, 서류부터 보증금까지 | 머니위키",
    description: "등기부등본·매각물건명세서·현황조사서 분석법과 현장 체크포인트, 보증금 준비부터 낙찰 후 절차까지 경매 초보자를 위한 체크리스트예요.",
    url: "https://www.jjyu.co.kr/w/주택경매-입찰-체크리스트",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

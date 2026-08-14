import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주식 양도소득세 과세 대상, 내가 세금을 내야 하는지 확인하기",
  description: "소액주주가 거래소에서 매매한 상장주식은 비과세예요. 대주주(종목당 50억원 이상)이거나 장외거래·비상장주식을 팔았다면 과세 대상이에요. 2026년 세율과 신고 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주식-양도소득세-과세대상" },
  openGraph: {
    title: "주식 양도소득세 과세 대상, 내가 세금을 내야 하는지 확인하기 | 머니위키",
    description: "소액주주가 거래소에서 매매한 상장주식은 비과세예요. 대주주(종목당 50억원 이상)이거나 장외거래·비상장주식을 팔았다면 과세 대상이에요.",
    url: "https://www.jjyu.co.kr/w/주식-양도소득세-과세대상",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

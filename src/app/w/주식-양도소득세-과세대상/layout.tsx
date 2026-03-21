import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주식 양도소득세 과세 대상, 내가 해당하나요? | 머니위키",
  description: "소액주주 상장주식은 비과세예요. 대주주(50억원 이상) 또는 장외거래·비상장주식은 과세 대상이에요. 신고 기한과 세율까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주식-양도소득세-과세대상" },
  openGraph: {
    title: "주식 양도소득세 과세 대상, 내가 해당하나요? | 머니위키",
    description: "소액주주 상장주식은 비과세예요. 대주주(50억원 이상) 또는 장외거래·비상장주식은 과세 대상이에요. 신고 기한과 세율까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/주식-양도소득세-과세대상",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

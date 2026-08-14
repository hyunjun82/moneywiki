import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "집 팔 때 양도세 안 내려면? 1세대 1주택 비과세 요건과 12억 기준",
  description: "1세대 1주택 비과세는 보유 2년+거주 2년(조정지역)+12억 이하가 기본 조건이에요. 12억 초과분 계산법, 일시적 2주택 특례, 비과세 자가진단까지 한 번에 정리해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/양도소득세-비과세-요건",
  },
  openGraph: {
    title: "집 팔 때 양도세 안 내려면? 1세대 1주택 비과세 요건과 12억 기준",
    description: "1세대 1주택 비과세 요건 자가진단, 12억 초과 계산법, 일시적 2주택 특례까지.",
    url: "https://www.jjyu.co.kr/w/양도소득세-비과세-요건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

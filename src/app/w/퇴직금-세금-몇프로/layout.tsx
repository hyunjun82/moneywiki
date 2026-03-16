import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 세금이 몇 퍼센트인지 계산하는 방법 | 머니위키",
  description: "퇴직금 세율은 고정이 아니에요. 근속연수와 금액에 따라 실효세율이 달라지죠. 계산 구조와 세율 차이를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-세금-몇프로" },
  openGraph: {
    title: "퇴직금 세금이 몇 퍼센트인지 계산하는 방법 | 머니위키",
    description: "퇴직금 세율은 고정이 아니에요. 근속연수와 금액에 따라 실효세율이 달라지죠. 계산 구조와 세율 차이를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-세금-몇프로",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

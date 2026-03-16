import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 소득세, 어떻게 계산하나요? | 머니위키",
  description: "퇴직소득세는 일반 소득세와 계산 방식이 달라요. 연분연승법의 계산 공식, 환급 가능성, 절세 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-소득세" },
  openGraph: {
    title: "퇴직금 소득세, 어떻게 계산하나요? | 머니위키",
    description: "퇴직소득세는 일반 소득세와 계산 방식이 달라요. 연분연승법의 계산 공식, 환급 가능성, 절세 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-소득세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

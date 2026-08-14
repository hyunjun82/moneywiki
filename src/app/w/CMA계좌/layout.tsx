import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "CMA 계좌란? 금리·유형·개설 방법 한번에",
  description: "은행 통장 이자가 너무 적다면 CMA를 써보세요. 매일 이자가 붙고 연 3% 수준이에요. RP형·발행어음형·MMF형 차이와 개설 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/CMA계좌" },
  openGraph: {
    title: "CMA 계좌란? 금리·유형·개설 방법 한번에 | 머니위키",
    description: "은행 통장 이자가 너무 적다면 CMA를 써보세요. 매일 이자가 붙고 연 3% 수준이에요. RP형·발행어음형·MMF형 차이와 개설 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/CMA계좌",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

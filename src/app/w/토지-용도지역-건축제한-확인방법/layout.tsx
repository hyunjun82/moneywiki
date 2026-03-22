import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이 땅에 집을 지을 수 있을까? 용도지역 확인부터 건축 제한까지 | 머니위키",
  description: "생산녹지 건폐율 20%, 그린벨트는 원칙 금지. 토지이음에서 용도지역 확인하고 건축 가능 여부를 판단하는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/토지-용도지역-건축제한-확인방법" },
  openGraph: {
    title: "이 땅에 집을 지을 수 있을까? 용도지역 확인부터 건축 제한까지 | 머니위키",
    description: "생산녹지 건폐율 20%, 그린벨트는 원칙 금지. 토지이음에서 용도지역 확인하고 건축 가능 여부를 판단하는 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/토지-용도지역-건축제한-확인방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

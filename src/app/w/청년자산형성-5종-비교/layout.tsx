import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년 목돈 마련 상품, 나한테 뭐가 맞을까? 5종 비교와 선택 기준 | 머니위키",
  description: "청년미래적금·도약계좌·내일저축계좌·장병적금·ISA, 소득별로 맞는 상품이 달라요. 5종 비교표와 중복 가입 규칙을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년자산형성-5종-비교" },
  openGraph: {
    title: "청년 목돈 마련 상품, 나한테 뭐가 맞을까? 5종 비교와 선택 기준 | 머니위키",
    description: "청년미래적금·도약계좌·내일저축계좌·장병적금·ISA, 소득별로 맞는 상품이 달라요. 5종 비교표와 중복 가입 규칙을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/청년자산형성-5종-비교",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

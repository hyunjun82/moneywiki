import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "종신보험 상속재산 평가 계약 구조별 과세 기준 | 머니위키",
  description: "종신보험 사망보험금 상속세 과세 여부는 계약 구조에 따라 달라요. 계약자=피보험자면 과세, 자녀=계약자면 비과세. 계약 구조별 절세 방법까지 정리했어요.",
  openGraph: {
    title: "종신보험 상속재산 평가 계약 구조별 과세 기준",
    description: "계약자·피보험자·수익자 구조에 따라 상속세 과세 여부가 달라져요. 절세 구조 변경 방법까지.",
    url: "https://jjyu.co.kr/w/종신보험-상속재산-평가",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/종신보험-상속재산-평가" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

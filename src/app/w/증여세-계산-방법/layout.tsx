import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "증여세 계산 방법, 얼마나 내야 할까? | 머니위키",
  description: "증여세는 10%~50% 누진세율이에요. 관계별 공제 한도와 4단계 계산 방법을 예시와 함께 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/증여세-계산-방법",
  },
  openGraph: {
    title: "증여세 계산 방법, 얼마나 내야 할까?",
    description: "부모→성인자녀 1억원 증여 시 세금 500만원. 세율표와 공제 한도를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/증여세-계산-방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

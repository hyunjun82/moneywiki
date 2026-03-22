import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "종신보험 증여세 상속세 차이 — 계약자 변경 시점별 세금 기준 | 머니위키",
  description: "종신보험 계약자를 살아 있을 때 변경하면 해지환급금 기준 증여세, 사망 후 보험금 받으면 상속세가 나와요. 유리한 변경 시점과 절세 전략을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/종신보험-증여세-상속세-차이",
  },
  openGraph: {
    title: "종신보험 증여세 상속세 차이 — 계약자 변경 시점별 세금 기준",
    description: "해지환급금이 적을 때 계약자를 변경하면 증여세가 줄고, 사망보험금에도 상속세가 안 나와요.",
    url: "https://www.jjyu.co.kr/w/종신보험-증여세-상속세-차이",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 사내근로복지기금, 세금을 내야 할까? | 머니위키",
  description: "사내근로복지기금에서 받은 학자금·의료비는 비과세예요. 회사 직접 지급과의 차이, 확인 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-사내근로복지기금",
  },
  openGraph: {
    title: "연말정산 사내근로복지기금, 세금을 내야 할까?",
    description: "복지기금 지급은 비과세, 회사 직접 지급은 과세. 같은 학자금도 주체에 따라 달라져요.",
    url: "https://www.jjyu.co.kr/w/연말정산-사내근로복지기금",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

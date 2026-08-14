import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년 중소기업 소득세 감면 신청 방법, 5년간 연 200만원 절약",
  description: "청년이 중소기업에 취업하면 5년간 소득세 90%를 감면받아요. 2024년부터 연 한도가 200만원으로 올라갔어요. 신청 절차와 병역 특례 계산법까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/청년-중소기업-소득세-감면-신청",
  },
  openGraph: {
    title: "청년 중소기업 소득세 감면 신청 방법, 5년간 연 200만원 절약",
    description: "인사팀에 신청서 한 장이면 돼요. 첫 급여 전에 내면 바로 적용되고, 늦게 내도 연말정산에서 환급받아요.",
    url: "https://www.jjyu.co.kr/w/청년-중소기업-소득세-감면-신청",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

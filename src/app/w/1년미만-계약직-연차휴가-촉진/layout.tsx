import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "1년 미만 계약직 연차휴가 촉진, 합법일까? | 머니위키",
  description: "2020년 법 개정으로 1년 미만 계약직도 연차 사용촉진 대상이에요. 촉진 절차 요건과 부적법 시 수당 청구 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/1년미만-계약직-연차휴가-촉진",
  },
  openGraph: {
    title: "1년 미만 계약직 연차휴가 촉진, 합법일까?",
    description: "서면 통보 2회를 지켜야 적법한 촉진이에요. 요건과 수당 청구 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/1년미만-계약직-연차휴가-촉진",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "129 주택 공급대책, 어디에 얼마나 짓나요? 수도권 6만 가구 일정",
  description: "2026년 1월 29일 발표된 수도권 6만 가구 공급대책이에요. 용산 1만, 과천 9,800가구 포함, 2027년 착공 예정이고 청약 준비법까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/1월-29일-주택-공급대책",
  },
  openGraph: {
    title: "129 주택 공급대책, 수도권 6만 가구 공급 일정과 청약 준비법",
    description: "용산 1만, 과천 9,800가구 포함 수도권 6만 가구 공급. 2027년 착공, 2029~2030년 입주 예정.",
    url: "https://www.jjyu.co.kr/w/1월-29일-주택-공급대책",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

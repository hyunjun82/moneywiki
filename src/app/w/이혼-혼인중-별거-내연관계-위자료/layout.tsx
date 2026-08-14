import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "별거 중 배우자 외도, 위자료 받을 수 있나? 혼인파탄 기준과 금액",
  description: "별거 중 외도한 배우자에게 위자료를 청구할 수 있는지, 혼인파탄 판단 기준과 금액 산정 요소를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-혼인중-별거-내연관계-위자료" },
  openGraph: {
    title: "별거 중 배우자 외도, 위자료 받을 수 있나? 혼인파탄 기준과 금액 | 머니위키",
    description: "별거 중 외도한 배우자에게 위자료를 청구할 수 있는지, 혼인파탄 판단 기준과 금액 산정 요소를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/이혼-혼인중-별거-내연관계-위자료",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

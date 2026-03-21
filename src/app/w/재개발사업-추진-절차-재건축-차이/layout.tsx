import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "재개발 추진 절차, 재건축과 뭐가 다를까? 10단계 과정과 참여 기준 | 머니위키",
  description: "재개발과 재건축의 차이, 10단계 추진 절차, 참여 여부 판단 기준을 정리했어요. 기본계획부터 청산까지 소요 기간은 보통 5~10년이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재개발사업-추진-절차-재건축-차이" },
  openGraph: {
    title: "재개발 추진 절차, 재건축과 뭐가 다를까? 10단계 과정과 참여 기준 | 머니위키",
    description: "재개발과 재건축의 차이, 10단계 추진 절차, 참여 여부 판단 기준을 정리했어요. 기본계획부터 청산까지 소요 기간은 보통 5~10년이에요.",
    url: "https://www.jjyu.co.kr/w/재개발사업-추진-절차-재건축-차이",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

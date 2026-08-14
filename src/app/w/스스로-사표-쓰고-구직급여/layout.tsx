import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "스스로 사표 쓰고 구직급여 받을 수 있을까? 정당 사유와 신청 절차",
  description: "자진퇴사도 정당 사유가 있으면 구직급여를 받을 수 있어요. 임금체불, 괴롭힘, 건강 문제 등 6가지 사유와 증거 준비 방법을 정리했어요.",
  openGraph: {
    title: "스스로 사표 쓰고 구직급여 받을 수 있을까? 정당 사유와 신청 절차 | 머니위키",
    description: "자진퇴사 후 구직급여 받는 조건과 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/스스로-사표-쓰고-구직급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/스스로-사표-쓰고-구직급여" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

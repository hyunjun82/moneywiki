import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "어떤 퇴사가 정당한 사유일까? 조건부터 증빙 서류",
  description: "자발적 퇴사도 임금체불, 괴롭힘, 건강 문제 등 정당한 사유가 있으면 실업급여를 받을 수 있어요. 사유별 증빙자료와 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-정당한-퇴사-사유" },
  openGraph: {
    title: "어떤 퇴사가 정당한 사유일까? 조건부터 증빙 서류 | 머니위키",
    description: "자발적 퇴사도 임금체불, 괴롭힘, 건강 문제 등 정당한 사유가 있으면 실업급여를 받을 수 있어요. 사유별 증빙자료와 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-정당한-퇴사-사유",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

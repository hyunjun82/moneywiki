import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자발적 퇴사했는데 구직급여 받을 수 있을까? 정당사유 판단부터 신청까지 | 머니위키",
  description: "자발적 퇴사도 정당한 사유가 있으면 실업급여를 받을 수 있어요. 임금체불, 괴롭힘, 건강 문제 등 정당사유 판단과 증빙 서류 준비부터 고용센터 신청 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자발적-퇴사-구직급여-받기" },
  openGraph: {
    title: "자발적 퇴사했는데 구직급여 받을 수 있을까? 정당사유 판단부터 신청까지 | 머니위키",
    description: "자발적 퇴사도 정당한 사유가 있으면 실업급여를 받을 수 있어요. 임금체불, 괴롭힘, 건강 문제 등 정당사유 판단과 증빙 서류 준비부터 고용센터 신청 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/자발적-퇴사-구직급여-받기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

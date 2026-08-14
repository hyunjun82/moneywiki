import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 중간정산 법정 사유와 신청 절차",
  description: "퇴직금 중간정산 법정 사유 6가지와 신청 절차를 단계별로 정리했어요. 사유별 증빙서류부터 회사 거부 시 대처법까지 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중간정산-신청-법정-사유-절차" },
  openGraph: {
    title: "퇴직금 중간정산 법정 사유와 신청 절차 | 머니위키",
    description: "퇴직금 중간정산 법정 사유 6가지와 신청 절차를 단계별로 정리했어요. 사유별 증빙서류부터 회사 거부 시 대처법까지 안내해요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중간정산-신청-법정-사유-절차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

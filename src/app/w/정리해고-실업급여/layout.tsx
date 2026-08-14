import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "정리해고 당했다면? 실업급여 금액과 신청 절차",
  description: "정리해고로 퇴직하면 실업급여 대상이에요. 경영상 이유로 해고됐을 때 수급 조건, 금액 계산법, 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/정리해고-실업급여" },
  openGraph: {
    title: "정리해고 당했다면? 실업급여 금액과 신청 절차 | 머니위키",
    description: "정리해고로 퇴직하면 실업급여 대상이에요. 경영상 이유로 해고됐을 때 수급 조건, 금액 계산법, 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/정리해고-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "시간선택제 근로자 고용 지원금, 금액·조건·신청 방법",
  description: "시간선택제 근로자 채용 시 임금 80%를 1년간 지원받아요. 채용형·전환형 금액과 고용24 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/시간선택제-근로자-고용-지원금" },
  openGraph: {
    title: "시간선택제 근로자 고용 지원금, 금액·조건·신청 방법 | 머니위키",
    description: "시간선택제 근로자 채용 시 임금 80%를 1년간 지원받아요. 채용형·전환형 금액과 고용24 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/시간선택제-근로자-고용-지원금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

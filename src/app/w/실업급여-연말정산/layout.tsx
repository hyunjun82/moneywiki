import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 받으면 연말정산은? 비과세 소득과 세금 처리 기준",
  description: "실업급여는 비과세 소득이라 연말정산에 포함하지 않아요. 중도퇴사자의 종합소득세 신고 방법과 환급받는 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-연말정산" },
  openGraph: {
    title: "실업급여 받으면 연말정산은? 비과세 소득과 세금 처리 기준 | 머니위키",
    description: "실업급여는 비과세 소득이라 연말정산에 포함하지 않아요. 중도퇴사자의 종합소득세 신고 방법과 환급받는 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-연말정산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

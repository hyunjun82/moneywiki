import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 중간정산, 가능한 경우와 방법은?",
  description: "퇴직금 중간정산은 무주택 주택 구입, 6개월 이상 요양 등 법정 사유가 있어야 가능해요. 가능한 경우와 신청 방법, 세금까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중간정산" },
  openGraph: {
    title: "퇴직금 중간정산, 가능한 경우와 방법은? | 머니위키",
    description: "퇴직금 중간정산은 무주택 주택 구입, 6개월 이상 요양 등 법정 사유가 있어야 가능해요. 가능한 경우와 신청 방법, 세금까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중간정산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

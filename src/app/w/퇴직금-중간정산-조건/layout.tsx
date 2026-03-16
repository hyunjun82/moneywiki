import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 중간정산 조건, 어떤 경우에 가능한가요? | 머니위키",
  description: "퇴직금 중간정산은 무주택 주택 구입, 6개월 이상 요양, 천재지변 등 법정 사유에 해당해야 가능해요. 사유별 조건과 증빙서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중간정산-조건" },
  openGraph: {
    title: "퇴직금 중간정산 조건, 어떤 경우에 가능한가요? | 머니위키",
    description: "퇴직금 중간정산은 무주택 주택 구입, 6개월 이상 요양, 천재지변 등 법정 사유에 해당해야 가능해요. 사유별 조건과 증빙서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중간정산-조건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

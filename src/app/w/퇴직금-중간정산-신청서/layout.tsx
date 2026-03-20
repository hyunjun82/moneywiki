import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 중간정산 신청서, 어디서 받고 어떻게 쓰나요? | 머니위키",
  description: "퇴직금 중간정산 신청서 양식을 받는 방법부터 기재 항목, 사유별 증빙서류, 제출 절차까지 단계별로 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중간정산-신청서" },
  openGraph: {
    title: "퇴직금 중간정산 신청서, 어디서 받고 어떻게 쓰나요? | 머니위키",
    description: "퇴직금 중간정산 신청서 양식을 받는 방법부터 기재 항목, 사유별 증빙서류, 제출 절차까지 단계별로 안내해요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중간정산-신청서",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

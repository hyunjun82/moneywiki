import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금, 몇 개월 일해야 받을 수 있나요? | 머니위키",
  description: "퇴직금은 계속근로기간 1년(365일) 이상이어야 받을 수 있어요. 기간 계산법, 중간 퇴사 시 처리, 계약 갱신 합산 기준까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-몇개월부터" },
  openGraph: {
    title: "퇴직금, 몇 개월 일해야 받을 수 있나요? | 머니위키",
    description: "퇴직금은 계속근로기간 1년(365일) 이상이어야 받을 수 있어요. 기간 계산법, 중간 퇴사 시 처리, 계약 갱신 합산 기준까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-몇개월부터",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

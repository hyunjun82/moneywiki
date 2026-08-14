import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약갱신청구권 복비, 내야 할까? 중개수수료 기준",
  description: "계약갱신청구권으로 직접 갱신하면 복비 0원이에요. 부동산 통할 때 수수료 요율과 갱신·재계약 차이, 절약 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약갱신청구권-복비" },
  openGraph: {
    title: "계약갱신청구권 복비, 내야 할까? 중개수수료 기준 | 머니위키",
    description: "계약갱신청구권으로 직접 갱신하면 복비 0원이에요. 부동산 통할 때 수수료 요율과 갱신·재계약 차이, 절약 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/계약갱신청구권-복비",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

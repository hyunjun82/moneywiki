import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약갱신청구권, 언제 행사해야 하나요? 6개월~1개월 전 골든타임 | 머니위키",
  description: "계약갱신청구권은 만료 6개월~1개월 전에 행사해야 해요. 놓치면 권리가 사라지고 전세금 5% 상한도 적용 안 돼요. 내용증명 발송법까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/계약갱신청구권-기간",
  },
  openGraph: {
    title: "계약갱신청구권 행사 기간과 방법",
    description: "만료 6개월~1개월 전 골든타임. 3개월 전 내용증명이 가장 안전.",
    url: "https://www.jjyu.co.kr/w/계약갱신청구권-기간",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

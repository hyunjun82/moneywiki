import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약갱신청구권 행사 방법과 갱신거절 대응법",
  description: "계약갱신청구권은 1회 한정으로 2년 연장 가능해요. 계약 만료 6~2개월 전에 행사하고, 차임 인상은 5% 이내로 제한돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/계약갱신청구권-행사-갱신거절-대응",
  },
  openGraph: {
    title: "계약갱신청구권 행사 방법과 갱신거절 대응법",
    description: "갱신청구권 행사 조건, 절차, 갱신거절 정당 사유까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/계약갱신청구권-행사-갱신거절-대응",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

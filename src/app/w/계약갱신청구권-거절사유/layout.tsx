import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "계약갱신청구권 거절사유 | 머니위키",
  description: "집주인이 계약갱신청구권 거절할 수 있는 9가지 사유. 실거주, 2개월 연체, 재건축 등",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약갱신청구권-거절사유" },
  openGraph: {
    title: "계약갱신청구권 거절사유",
    description: "집주인이 계약갱신청구권 거절할 수 있는 9가지 사유. 실거주, 2개월 연체, 재건축 등",
    url: "https://www.jjyu.co.kr/w/계약갱신청구권-거절사유",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

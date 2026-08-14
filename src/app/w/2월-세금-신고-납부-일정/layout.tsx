import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2월 세금 신고 납부 일정 — 원천세·간이지급명세서 기한 정리",
  description: "2월에 챙겨야 할 세금 신고 일정을 날짜별로 정리했어요. 원천세 10일, 면세사업자 현황신고 10일, 간이지급명세서 말일(2026년은 3월 2일). 가산세 구조도 함께 설명해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/2월-세금-신고-납부-일정",
  },
  openGraph: {
    title: "2월 세금 신고 납부 일정 — 원천세·간이지급명세서 기한 정리",
    description: "2026년 2월 28일은 토요일이라 말일 마감이 3월 2일로 연장돼요. 원천세·면세사업자·간이지급명세서 일정을 한눈에 정리했어요.",
    url: "https://www.jjyu.co.kr/w/2월-세금-신고-납부-일정",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

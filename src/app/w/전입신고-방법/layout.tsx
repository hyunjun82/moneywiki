import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전입신고 방법, 정부24 온라인으로 5분이면 끝나요 | 머니위키",
  description: "잔금일 당일 전입신고해야 보증금 대항력이 빨리 생겨요. 정부24 온라인 신청 절차와 주민센터 방문 방법, 확정일자 동시 신청까지 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전입신고-방법" },
  openGraph: {
    title: "전입신고 방법, 정부24 온라인으로 5분이면 끝나요 | 머니위키",
    description: "잔금일 당일 전입신고해야 보증금 대항력이 빨리 생겨요. 정부24 온라인 신청 절차와 주민센터 방문 방법, 확정일자 동시 신청까지 알려드려요.",
    url: "https://www.jjyu.co.kr/w/전입신고-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

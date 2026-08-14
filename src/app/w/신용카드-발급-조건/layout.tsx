import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "신용카드 발급, 내 점수로 되나? 2026년 신용점수·소득 기준",
  description: "NICE 720점, KCB 621점 이상이면 신용카드 발급 가능해요. 월 가처분소득 50만원 이상도 필요하죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/신용카드-발급-조건" },
  openGraph: {
    title: "신용카드 발급, 내 점수로 되나? 2026년 신용점수·소득 기준 | 머니위키",
    description: "NICE 720점, KCB 621점 이상이면 신용카드 발급 가능해요. 월 가처분소득 50만원 이상도 필요하죠.",
    url: "https://www.jjyu.co.kr/w/신용카드-발급-조건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

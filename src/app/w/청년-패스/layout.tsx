import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년 혜택 모음 — K-패스·월세지원·기본소득 한눈에",
  description: "청년이라면 꼭 챙겨야 할 혜택 모음이에요. K-패스 교통비 30% 환급, 청년월세지원 월 20만원, 경기도 청년기본소득까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년-패스" },
  openGraph: {
    title: "청년 혜택 모음 — K-패스·월세지원·기본소득 한눈에 | 머니위키",
    description: "청년이라면 꼭 챙겨야 할 혜택 모음이에요. K-패스 교통비 30% 환급, 청년월세지원 월 20만원, 경기도 청년기본소득까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/청년-패스",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 해외교육비, 공제될까? 대상 조건부터 서류까지",
  description: "해외파견·주재원 자녀 교육비 공제 조건, 유치원~고교 연 300만원 한도, 자비유학 대학 제외 사유, 서류 준비법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-해외교육비" },
  openGraph: {
    title: "연말정산 해외교육비, 공제될까? 대상 조건부터 서류까지 | 머니위키",
    description: "해외파견·주재원 자녀 교육비 공제 조건, 유치원~고교 연 300만원 한도, 자비유학 대학 제외 사유, 서류 준비법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-해외교육비",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

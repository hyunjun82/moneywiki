import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세 묵시적갱신, 자동으로 2년 연장될까? 조건부터 보증금 상한까지 | 머니위키",
  description: "전세 계약 만료 6개월~1개월 전까지 통보 없으면 묵시적갱신으로 2년 자동 연장돼요. 보증금 5% 상한과 계약갱신청구권 차이를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세-재계약-묵시적갱신" },
  openGraph: {
    title: "전세 묵시적갱신, 자동으로 2년 연장될까? 조건부터 보증금 상한까지 | 머니위키",
    description: "계약 만료 전 통보 없으면 종전 조건 그대로 2년 연장돼요. 묵시적갱신 성립 조건, 보증금 5% 상한, 갱신청구권과의 차이를 한 글에 정리했어요.",
    url: "https://www.jjyu.co.kr/w/전세-재계약-묵시적갱신",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

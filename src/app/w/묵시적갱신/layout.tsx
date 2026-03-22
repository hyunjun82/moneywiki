import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "묵시적갱신, 아무 말 없으면 자동 연장? 조건·해지·갱신청구권 차이 | 머니위키",
  description: "계약 만료 후 양쪽 다 아무 말 없으면 기존 조건으로 2년 자동 연장돼요. 해지 통보 방법, 계약갱신청구권과 차이까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/묵시적갱신" },
  openGraph: {
    title: "묵시적갱신, 아무 말 없으면 자동 연장? 조건·해지·갱신청구권 차이 | 머니위키",
    description: "계약 만료 후 양쪽 다 아무 말 없으면 기존 조건으로 2년 자동 연장돼요. 해지 통보 방법, 계약갱신청구권과 차이까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/묵시적갱신",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

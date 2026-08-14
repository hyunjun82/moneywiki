import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "묵시적 갱신 조건과 해지 방법, 계약갱신청구권과 차이",
  description: "계약 만료 전 양쪽 미통보 시 자동 2년 연장. 임차인은 3개월 전 통보로 해지 가능. 묵시적 갱신 성립 조건, 해지 절차, 계약갱신청구권 비교까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/임대차-기간-묵시적-갱신",
  },
  openGraph: {
    title: "묵시적 갱신 조건과 해지 방법, 계약갱신청구권과 차이",
    description: "아무 말 없으면 자동 2년 연장. 해지는 3개월 전 통보.",
    url: "https://www.jjyu.co.kr/w/임대차-기간-묵시적-갱신",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

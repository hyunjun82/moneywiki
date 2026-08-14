import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국민연금 — 보험료·수령 나이·가입 조건 정리",
  description: "국민연금 보험료는 소득의 9%(직장인 절반 부담), 최소 10년 가입해야 노령연금을 받아요. 1969년생 이후 만 65세 수령 개시예요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/국민연금",
  },
  openGraph: {
    title: "국민연금 — 보험료·수령 나이·가입 조건 정리",
    description: "보험료율 9% 구조, 출생연도별 수령 나이, 예상 수령액 조회 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/국민연금",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

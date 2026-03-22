import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택연금 가입 조건 수령액 신청 방법 | 머니위키",
  description: "만 55세 이상, 공시가격 9억 이하 주택 소유자 가입 가능. 평생 매월 연금 수령. 신청 절차와 수령액 기준.",
  openGraph: { title: "주택연금 가입 조건 수령액 신청 방법", description: "55세 이상, 9억 이하 주택연금 가입 방법.", url: "https://jjyu.co.kr/w/주택연금" },
  alternates: { canonical: "https://jjyu.co.kr/w/주택연금" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

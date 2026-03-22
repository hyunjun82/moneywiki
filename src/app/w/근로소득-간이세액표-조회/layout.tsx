import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "근로소득 간이세액표 조회 계산 방법 2026년 | 머니위키",
  description: "매달 월급에서 떼는 세금, 정확한 금액이 궁금하시죠? 간이세액표로 월급과 부양가족 수만 입력하면 내 세금을 바로 알 수 있어요. 조회 방법부터 계산까지 알려드려요",
  openGraph: { title: "근로소득 간이세액표 조회 계산 방법 2026년", description: "매달 월급에서 떼는 세금, 정확한 금액이 궁금하시죠? 간이세액표로 월급과 부양가족 수만 입력하면 내 세금을 바로 알 수 있어요. 조회 방법부터 계산까지 알려드려요", url: "https://jjyu.co.kr/w/근로소득-간이세액표-조회" },
  alternates: { canonical: "https://jjyu.co.kr/w/근로소득-간이세액표-조회" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

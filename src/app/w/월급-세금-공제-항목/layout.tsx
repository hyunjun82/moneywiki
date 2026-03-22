import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "월급 세금 공제 항목: 소득세와 지방소득세 계산 | 머니위키",
  description: "월급에서 얼마나 떼가는지 궁금하시죠? 소득세, 지방소득세 계산 방법과 실제 공제액을 알려드려요",
  openGraph: { title: "월급 세금 공제 항목: 소득세와 지방소득세 계산", description: "월급에서 얼마나 떼가는지 궁금하시죠? 소득세, 지방소득세 계산 방법과 실제 공제액을 알려드려요", url: "https://jjyu.co.kr/w/월급-세금-공제-항목" },
  alternates: { canonical: "https://jjyu.co.kr/w/월급-세금-공제-항목" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

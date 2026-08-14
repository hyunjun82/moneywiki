import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기타소득 원천징수 세율 22% 필요경비 계산",
  description: "강연료나 원고료 받을 때 세금 얼마나 떼는지 궁금하시죠? 기타소득은 22% 원천징수하지만 필요경비 공제로 실제 부담은 8.8%예요. 필요경비 인정 기준과 계산 방법 알려드려요",
  openGraph: { title: "기타소득 원천징수 세율 22% 필요경비 계산", description: "강연료나 원고료 받을 때 세금 얼마나 떼는지 궁금하시죠? 기타소득은 22% 원천징수하지만 필요경비 공제로 실제 부담은 8.8%예요. 필요경비 인정 기준과 계산 방법 알려드려요", url: "https://jjyu.co.kr/w/기타소득-원천징수-세율" },
  alternates: { canonical: "https://jjyu.co.kr/w/기타소득-원천징수-세율" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 감액 사유: 부정수급과 취업 거부 시 급여 삭감 기준 | 머니위키",
  description: "실업급여가 줄어들 수 있다는데 불안하시죠? 감액되는 경우와 삭감 비율을 정리해드려요.",
  openGraph: { title: "실업급여 감액 사유: 부정수급과 취업 거부 시 급여 삭감 기준", description: "실업급여가 줄어들 수 있다는데 불안하시죠? 감액되는 경우와 삭감 비율을 정리해드려요.", url: "https://jjyu.co.kr/w/실업급여-감액" },
  alternates: { canonical: "https://jjyu.co.kr/w/실업급여-감액" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

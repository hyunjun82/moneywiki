import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "직원 급여 세금, 원천징수의무자란? 신고와 납부 방법",
  description: "직원 급여를 지급하는 사업주는 원천징수의무자. 간이세액표에 따라 소득세를 떼고 다음 달 10일까지 신고·납부해야 해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로소득원천징수의무자" },
  openGraph: { title: "원천징수의무자의 역할", description: "급여에서 소득세 원천징수 → 다음 달 10일까지 신고·납부.", url: "https://www.jjyu.co.kr/w/근로소득원천징수의무자", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

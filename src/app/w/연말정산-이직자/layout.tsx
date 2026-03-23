import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 이직자와 퇴사자 정산 방법 | 머니위키",
  description: "이직자는 전 직장 원천징수영수증을 제출해서 합산 정산해요. 퇴사자는 5월 종합소득세 신고로 환급받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-이직자" },
  openGraph: { title: "연말정산 이직자와 퇴사자 정산 방법", description: "이직자는 전 직장 원천징수영수증을 제출해서 합산 정산해요. 퇴사자는 5월 종합소득세 신고로 환급받을 수 있어요.", url: "https://www.jjyu.co.kr/w/연말정산-이직자", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

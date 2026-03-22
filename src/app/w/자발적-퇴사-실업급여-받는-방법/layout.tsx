import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "자발적 퇴사 실업급여: 정당한 사유 인정 및 신청 방법 | 머니위키",
  description: "자발적 퇴사해도 실업급여 받을 수 있는지 궁금하시죠? 정당한 사유가 있으면 받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자발적-퇴사-실업급여-받는-방법" },
  openGraph: { title: "자발적 퇴사 실업급여: 정당한 사유 인정 및 신청 방법", description: "자발적 퇴사해도 실업급여 받을 수 있는지 궁금하시죠? 정당한 사유가 있으면 받을 수 있어요.", url: "https://www.jjyu.co.kr/w/자발적-퇴사-실업급여-받는-방법", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

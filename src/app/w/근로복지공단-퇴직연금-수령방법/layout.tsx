import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "근로복지공단 퇴직연금 수령 방법 신청 절차와 필요 서류",
  description: "근로복지공단 퇴직연금 수령 방법 신청 절차와 필요 서류에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로복지공단-퇴직연금-수령방법" },
  openGraph: { title: "근로복지공단 퇴직연금 수령 방법 신청 절차와 필요 서류", description: "근로복지공단 퇴직연금 수령 방법 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/근로복지공단-퇴직연금-수령방법", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

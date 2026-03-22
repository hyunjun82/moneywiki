import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직소득세 — 계산 구조와 IRP 절세 방법 | 머니위키",
  description: "퇴직소득세는 근속연수공제 덕분에 일반 소득세보다 훨씬 적어요. 10년 근속 기준 퇴직금 1억에 세금 3~4%. 계산법과 IRP 절세를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직소득세" },
  openGraph: { title: "퇴직소득세 — 계산 구조와 IRP 절세 방법", description: "근속연수별 공제와 IRP 연금 절세 효과.", url: "https://www.jjyu.co.kr/w/퇴직소득세", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 공제대상자료 수집의무 완벽 가이드",
  description: "연말정산 공제대상자료 수집의무는 회사가 직원의 공제 자료를 수집할 책임을 말해요. 2025년 기준 수집 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-공제대상자료-수집의무" },
  openGraph: { title: "연말정산 공제대상자료 수집의무 완벽 가이드 | 머니위키", description: "연말정산 공제대상자료 수집의무는 회사가 직원의 공제 자료를 수집할 책임을 말해요. 2025년 기준 수집 절차를 정리했어요.", url: "https://www.jjyu.co.kr/w/연말정산-공제대상자료-수집의무", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

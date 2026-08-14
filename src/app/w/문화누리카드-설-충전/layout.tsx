import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "문화누리카드 설 충전, 언제 얼마 들어오나요? 충전 일정과 사용처",
  description: "2026년 문화누리카드 설 충전 일정과 잔액 확인 방법을 정리했어요. 연간 13만원 충전, 사용처도 알아보세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/문화누리카드-설-충전" },
  openGraph: { title: "문화누리카드 설 충전, 언제 얼마 들어오나요? 충전 일정과 사용처 | 머니위키", description: "2026년 문화누리카드 설 충전 일정과 잔액 확인 방법을 정리했어요. 연간 13만원 충전, 사용처도 알아보세요.", url: "https://www.jjyu.co.kr/w/문화누리카드-설-충전", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

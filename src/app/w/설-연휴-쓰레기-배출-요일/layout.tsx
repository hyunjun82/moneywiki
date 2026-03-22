import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "설 연휴 쓰레기 배출 요일 — 수거 중단일과 과태료 기준 | 머니위키",
  description: "설 연휴에는 쓰레기 수거가 중단돼요. 배출 금지일에 내놓으면 10만~100만원 과태료. 배출 가능 요일과 처리 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/설-연휴-쓰레기-배출-요일" },
  openGraph: { title: "설 연휴 쓰레기 배출 요일 — 수거 중단일과 과태료", description: "배출 가능 요일과 과태료 기준 정리.", url: "https://www.jjyu.co.kr/w/설-연휴-쓰레기-배출-요일", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "다가구주택 경계벽 대수선 허가 — 내력벽 기준과 절차",
  description: "다가구주택 경계벽이 내력벽이면 대수선 허가가 필요해요. 허가 절차, 필요 서류, 무허가 공사 시 처벌까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/다가구주택-경계벽-대수선-허가" },
  openGraph: { title: "다가구주택 경계벽 대수선 허가 — 내력벽 기준과 절차", description: "경계벽 내력벽 여부 확인, 대수선 허가 5단계, 무허가 처벌까지 정리했어요.", url: "https://www.jjyu.co.kr/w/다가구주택-경계벽-대수선-허가", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

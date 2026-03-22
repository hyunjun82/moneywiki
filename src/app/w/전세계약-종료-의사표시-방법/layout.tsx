import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전세계약 만료, 의사표시 언제 해야 하나? 통지 기한과 방법 | 머니위키",
  description: "전세계약 만료, 의사표시 언제 해야 하나? 통지 기한과 방법에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세계약-종료-의사표시-방법" },
  openGraph: { title: "전세계약 만료, 의사표시 언제 해야 하나? 통지 기한과 방법", description: "전세계약 만료, 의사표시 언제 해야 하나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/전세계약-종료-의사표시-방법", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

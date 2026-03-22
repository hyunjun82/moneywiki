import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "취학전 아동 교육비 공제 대상은? 어린이집 유치원 학원비 | 머니위키",
  description: "취학전 아동 교육비 공제 대상은? 어린이집 유치원 학원비에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-취학전-아동-교육비" },
  openGraph: { title: "취학전 아동 교육비 공제 대상은? 어린이집 유치원 학원비", description: "취학전 아동 교육비 공제 대상은? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-취학전-아동-교육비", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

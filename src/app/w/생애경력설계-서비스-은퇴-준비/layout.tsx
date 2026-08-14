import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "은퇴 준비, 생애경력설계 서비스 활용법 신청 방법과 지원 내용",
  description: "은퇴 준비, 생애경력설계 서비스 활용법 신청 방법과 지원 내용에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/생애경력설계-서비스-은퇴-준비" },
  openGraph: { title: "은퇴 준비, 생애경력설계 서비스 활용법 신청 방법과 지원 내용", description: "은퇴 준비, 생애경력설계 서비스 활용법 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/생애경력설계-서비스-은퇴-준비", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

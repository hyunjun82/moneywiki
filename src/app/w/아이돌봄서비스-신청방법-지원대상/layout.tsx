import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "아이돌봄서비스 지원대상·비용·신청방법",
  description: "아이돌봄서비스는 만 12세 이하 아동 가정에 아이돌보미가 방문해요. 2026년부터 중위소득 250%까지 지원 대상이 확대됐어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/아이돌봄서비스-신청방법-지원대상" },
  openGraph: { title: "아이돌봄서비스 지원대상·비용·신청방법", description: "아이돌봄서비스는 만 12세 이하 아동 가정에 아이돌보미가 방문해요. 2026년부터 중위소득 250%까지 지원 대상이 확대됐어요.", url: "https://www.jjyu.co.kr/w/아이돌봄서비스-신청방법-지원대상", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년월세지원 24개월 확대, 뭐가 달라졌을까? 변경 내용 정리 | 머니위키",
  description: "2026년 청년월세지원이 12개월에서 24개월로 확대됐어요. 총 480만원까지 받을 수 있는 변경 내용을 비교 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-24개월-확대-변경내용" },
  openGraph: { title: "청년월세지원 24개월 확대, 뭐가 달라졌을까? 변경 내용 정리 | 머니위키", description: "2026년 청년월세지원이 12개월에서 24개월로 확대됐어요. 총 480만원까지 받을 수 있는 변경 내용을 비교 정리했어요.", url: "https://www.jjyu.co.kr/w/청년월세지원-24개월-확대-변경내용", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

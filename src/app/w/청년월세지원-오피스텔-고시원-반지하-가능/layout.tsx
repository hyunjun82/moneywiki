import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "오피스텔·고시원·반지하도 청년월세지원 될까? 주거 유형별 기준 | 머니위키",
  description: "오피스텔, 고시원, 반지하, 원룸 등 주거 유형별로 청년월세지원이 되는지 정리했어요. 전입신고 가능 여부가 핵심이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-오피스텔-고시원-반지하-가능" },
  openGraph: { title: "오피스텔·고시원·반지하도 청년월세지원 될까? 주거 유형별 기준 | 머니위키", description: "오피스텔, 고시원, 반지하, 원룸 등 주거 유형별로 청년월세지원이 되는지 정리했어요. 전입신고 가능 여부가 핵심이에요.", url: "https://www.jjyu.co.kr/w/청년월세지원-오피스텔-고시원-반지하-가능", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

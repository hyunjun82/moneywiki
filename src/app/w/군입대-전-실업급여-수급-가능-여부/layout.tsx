import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "군입대 전 실업급여: 징집·입영 예정자 수급 가능 여부 및 급여유예",
  description: "군대 가기 전에 실업급여 받을 수 있는지 궁금하시죠? 입영 예정자 수급 조건과 기한연기 신청 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/군입대-전-실업급여-수급-가능-여부" },
  openGraph: { title: "군입대 전 실업급여: 징집·입영 예정자 수급 가능 여부 및 급여유예 | 머니위키", description: "군대 가기 전에 실업급여 받을 수 있는지 궁금하시죠? 입영 예정자 수급 조건과 기한연기 신청 방법을 알려드려요.", url: "https://www.jjyu.co.kr/w/군입대-전-실업급여-수급-가능-여부", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

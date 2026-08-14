import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연장근로 수당·50% 가산 계산·청구 방법·미지급 대응",
  description: "연장근로 수당은 시간당 통상임금의 50% 가산해서 받아요. 실제 계산법과 야간·휴일 중복 가산 방법 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연장근로-수당-계산-방법" },
  openGraph: { title: "연장근로 수당·50% 가산 계산·청구 방법·미지급 대응 | 머니위키", description: "연장근로 수당은 시간당 통상임금의 50% 가산해서 받아요. 실제 계산법과 야간·휴일 중복 가산 방법 알려드려요.", url: "https://www.jjyu.co.kr/w/연장근로-수당-계산-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

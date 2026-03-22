import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "휴일에 일했으면 수당이 얼마인가요? 휴일근로 수당 계산 방법 | 머니위키",
  description: "휴일근로수당은 통상임금의 150%(8시간 이내), 200%(8시간 초과)예요. 계산법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/휴일근로-수당-계산-방법" },
  openGraph: { title: "휴일에 일했으면 수당이 얼마인가요? 휴일근로 수당 계산 방법 | 머니위키", description: "휴일근로수당은 통상임금의 150%(8시간 이내), 200%(8시간 초과)예요. 계산법을 정리했어요.", url: "https://www.jjyu.co.kr/w/휴일근로-수당-계산-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

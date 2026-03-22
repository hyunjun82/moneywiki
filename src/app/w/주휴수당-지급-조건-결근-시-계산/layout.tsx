import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주휴수당, 결근하면 못 받나요? 지급 조건과 계산 방법 | 머니위키",
  description: "주 15시간 이상 근무하고 개근한 주에만 주휴수당이 발생해요. 결근 시 계산법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주휴수당-지급-조건-결근-시-계산" },
  openGraph: { title: "주휴수당, 결근하면 못 받나요? 지급 조건과 계산 방법 | 머니위키", description: "주 15시간 이상 근무하고 개근한 주에만 주휴수당이 발생해요. 결근 시 계산법을 정리했어요.", url: "https://www.jjyu.co.kr/w/주휴수당-지급-조건-결근-시-계산", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

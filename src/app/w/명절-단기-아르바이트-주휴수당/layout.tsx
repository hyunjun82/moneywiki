import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "명절 단기 알바 주휴수당 — 발생 조건과 계산법 | 머니위키",
  description: "명절 단기 아르바이트도 주 15시간 이상 근무하면 주휴수당이 발생해요. 계산법과 미지급 시 청구 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/명절-단기-아르바이트-주휴수당" },
  openGraph: { title: "명절 단기 알바 주휴수당", description: "주 15시간 이상 개근 시 주휴수당 지급 의무.", url: "https://www.jjyu.co.kr/w/명절-단기-아르바이트-주휴수당", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

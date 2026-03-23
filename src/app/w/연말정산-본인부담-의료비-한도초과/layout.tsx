import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 본인부담 의료비 한도 초과 시 세액공제 | 머니위키",
  description: "본인부담 의료비가 700만원을 초과하면 초과분에 대해 추가 세액공제를 받을 수 있어요. 2025년 기준 계산법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-본인부담-의료비-한도초과" },
  openGraph: { title: "연말정산 본인부담 의료비 한도 초과 시 세액공제", description: "본인부담 의료비가 700만원을 초과하면 초과분에 대해 추가 세액공제를 받을 수 있어요. 2025년 기준 계산법을 정리했어요.", url: "https://www.jjyu.co.kr/w/연말정산-본인부담-의료비-한도초과", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

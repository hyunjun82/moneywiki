export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "외도한 배우자에게 위자료 받을 수 있나요? 증거와 청구 | 머니위키",
  description: "배우자 외도 시 위자료 1,000~5,000만원 청구 가능. 상간자에게도 별도 청구. 증거 확보가 핵심.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-청구-외도-책임" },
  openGraph: { title: "외도 이혼 위자료 청구", description: "위자료 1,000~5,000만원. 증거 확보가 핵심.", url: "https://www.jjyu.co.kr/w/이혼-청구-외도-책임", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

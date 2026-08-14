import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 자가운전보조금",
  description: "본인 차량을 업무에 사용하면 월 20만원까지 비과세예요. 실비 정산이 아닌 정액 지급 방식이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-자가운전보조금" },
  openGraph: { title: "연말정산 자가운전보조금", description: "본인 차량을 업무에 사용하면 월 20만원까지 비과세예요. 실비 정산이 아닌 정액 지급 방식이에요.", url: "https://www.jjyu.co.kr/w/연말정산-자가운전보조금", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

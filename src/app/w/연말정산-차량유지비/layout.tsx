import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 차량유지비 | 머니위키",
  description: "차량유지비는 연말정산 공제 대상이 아니에요. 자가운전보조금만 월 20만원까지 비과세 받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-차량유지비" },
  openGraph: {
    title: "연말정산 차량유지비",
    description: "차량유지비는 연말정산 공제 대상이 아니에요. 자가운전보조금만 월 20만원까지 비과세 받을 수 있어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-차량유지비",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

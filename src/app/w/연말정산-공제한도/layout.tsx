import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 공제한도",
  description: "연말정산 공제한도는 항목마다 달라요. 신용카드 300만원, 연금저축 600만원, 의료비는 본인 무제한이에요. 한도 꽉 채우면 수백만원 절세예요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-공제한도" },
  openGraph: { title: "연말정산 공제한도", description: "연말정산 공제한도는 항목마다 달라요. 신용카드 300만원, 연금저축 600만원, 의료비는 본인 무제한이에요. 한도 꽉 채우면 수백만원 절세예요", url: "https://www.jjyu.co.kr/w/연말정산-공제한도", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

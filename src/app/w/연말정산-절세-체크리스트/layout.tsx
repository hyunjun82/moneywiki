import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 절세 체크리스트",
  description: "연말정산 놓치기 쉬운 공제 9가지 체크하세요. 안경비, 교복비, 월세 등 빠뜨리면 수십만원 손해예요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-절세-체크리스트" },
  openGraph: {
    title: "연말정산 절세 체크리스트",
    description: "연말정산 놓치기 쉬운 공제 9가지 체크하세요. 안경비, 교복비, 월세 등 빠뜨리면 수십만원 손해예요",
    url: "https://www.jjyu.co.kr/w/연말정산-절세-체크리스트",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

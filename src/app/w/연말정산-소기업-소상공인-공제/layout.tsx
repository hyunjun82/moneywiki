import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 소기업 소상공인 공제 (노란우산공제)",
  description: "노란우산공제 납입금은 소득공제 대상이에요. 2025년부터 공제 한도가 상향되어 소득 4천만원 이하면 최대 600만원까지 공제받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-소기업-소상공인-공제" },
  openGraph: { title: "연말정산 소기업 소상공인 공제 (노란우산공제)", description: "노란우산공제 납입금은 소득공제 대상이에요. 2025년부터 공제 한도가 상향되어 소득 4천만원 이하면 최대 600만원까지 공제받을 수 있어요.", url: "https://www.jjyu.co.kr/w/연말정산-소기업-소상공인-공제", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산-이월결손금-공제 | 머니위키",
  description: "",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-이월결손금-공제" },
  openGraph: { title: "연말정산-이월결손금-공제 | 머니위키", description: "", url: "https://www.jjyu.co.kr/w/연말정산-이월결손금-공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

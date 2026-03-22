import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 정치자금 기부금 공제 | 머니위키",
  description: "",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-정치자금-기부금-공제" },
  openGraph: {
    title: "연말정산 정치자금 기부금 공제",
    description: "",
    url: "https://www.jjyu.co.kr/w/연말정산-정치자금-기부금-공제",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

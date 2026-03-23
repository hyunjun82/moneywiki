import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 전자기부금 영수증 | 머니위키",
  description: "",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-전자기부금-영수증" },
  openGraph: {
    title: "연말정산 전자기부금 영수증",
    description: "",
    url: "https://www.jjyu.co.kr/w/연말정산-전자기부금-영수증",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

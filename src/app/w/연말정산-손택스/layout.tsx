import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 손택스",
  description: "손택스 앱에서 연말정산 간소화자료 조회와 PDF 제출이 가능해요. 1월 15일부터 이용할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-손택스" },
  openGraph: {
    title: "연말정산 손택스",
    description: "손택스 앱에서 연말정산 간소화자료 조회와 PDF 제출이 가능해요. 1월 15일부터 이용할 수 있어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-손택스",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

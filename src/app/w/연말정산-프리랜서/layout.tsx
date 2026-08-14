import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 프리랜서",
  description: "프리랜서는 연말정산 대상이 아니에요. 5월 종합소득세 신고로 3.3% 환급받을 수 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-프리랜서" },
  openGraph: {
    title: "연말정산 프리랜서",
    description: "프리랜서는 연말정산 대상이 아니에요. 5월 종합소득세 신고로 3.3% 환급받을 수 있어요",
    url: "https://www.jjyu.co.kr/w/연말정산-프리랜서",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

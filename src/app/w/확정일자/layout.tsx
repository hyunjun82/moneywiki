import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "확정일자 받는 방법과 우선변제권 효력 | 머니위키",
  description: "확정일자는 경매 때 보증금을 먼저 받을 수 있는 권리를 만들어요. 주민센터 600원 또는 전월세신고 시 무료로 받을 수 있어요.",
  openGraph: {
    title: "확정일자 받는 방법과 우선변제권 효력 | 머니위키",
    description: "확정일자로 우선변제권을 확보하는 방법이에요.",
    url: "https://www.jjyu.co.kr/w/확정일자",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/확정일자" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 주택자금 | 머니위키",
  description: "주택 구입이나 전세자금 대출 이자를 연말정산에서 소득공제받을 수 있어요. 장기주택저당차입금은 최대 1,800만원까지 공제돼요.",
  openGraph: { title: "연말정산 주택자금 | 머니위키", description: "주택 구입이나 전세자금 대출 이자를 연말정산에서 소득공제받을 수 있어요. 장기주택저당차입금은 최대 1,800만원까지 공제돼요.", url: "https://www.jjyu.co.kr/w/연말정산-주택자금", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-주택자금" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 신용카드 체크카드 비교 | 머니위키",
  description: "체크카드 공제율 30%, 신용카드 15%로 체크카드가 2배 유리해요. 총급여 25% 초과분부터 공제가 시작돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-신용카드-체크카드-비교" },
  openGraph: { title: "연말정산 신용카드 체크카드 비교", description: "체크카드 공제율 30%, 신용카드 15%로 체크카드가 2배 유리해요. 총급여 25% 초과분부터 공제가 시작돼요.", url: "https://www.jjyu.co.kr/w/연말정산-신용카드-체크카드-비교", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 체크카드",
  description: "체크카드는 신용카드보다 공제율이 2배 높아요. 신용카드 15%보다 체크카드는 30% 소득공제받을 수 있어요.",
  openGraph: { title: "연말정산 체크카드 | 머니위키", description: "체크카드는 신용카드보다 공제율이 2배 높아요. 신용카드 15%보다 체크카드는 30% 소득공제받을 수 있어요.", url: "https://www.jjyu.co.kr/w/연말정산-체크카드", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-체크카드" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 장기주택저당차입금",
  description: "주택담보대출 이자는 연 1,800만원까지 소득공제받을 수 있어요. 상환기간 15년 이상, 주택가액 6억원 이하 등 조건이 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-장기주택저당차입금" },
  openGraph: {
    title: "연말정산 장기주택저당차입금",
    description: "주택담보대출 이자는 연 1,800만원까지 소득공제받을 수 있어요. 상환기간 15년 이상, 주택가액 6억원 이하 등 조건이 있어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-장기주택저당차입금",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 중도인출 세금 | 머니위키",
  description: "퇴직연금 중도인출할 때 세금이 얼마나 나오는지 알려드려요. 법정 사유면 세금이 적어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-중도인출-세금" },
  openGraph: {
    title: "퇴직연금 중도인출 세금",
    description: "퇴직연금 중도인출할 때 세금이 얼마나 나오는지 알려드려요. 법정 사유면 세금이 적어요",
    url: "https://www.jjyu.co.kr/w/퇴직연금-중도인출-세금",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

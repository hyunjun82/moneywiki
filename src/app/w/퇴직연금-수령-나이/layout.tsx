import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 수령 나이 | 머니위키",
  description: "퇴직연금 몇 살부터 받을 수 있는지 알려드려요. 55세부터 연금수령 가능해요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-수령-나이" },
  openGraph: {
    title: "퇴직연금 수령 나이",
    description: "퇴직연금 몇 살부터 받을 수 있는지 알려드려요. 55세부터 연금수령 가능해요",
    url: "https://www.jjyu.co.kr/w/퇴직연금-수령-나이",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

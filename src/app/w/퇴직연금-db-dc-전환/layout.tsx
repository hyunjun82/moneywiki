import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 DB DC 전환 | 머니위키",
  description: "DB형에서 DC형으로 퇴직연금 전환하는 방법 알려드려요. 한번 바꾸면 다시 못 돌아가요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-db-dc-전환" },
  openGraph: { title: "퇴직연금 DB DC 전환", description: "DB형에서 DC형으로 퇴직연금 전환하는 방법 알려드려요. 한번 바꾸면 다시 못 돌아가요", url: "https://www.jjyu.co.kr/w/퇴직연금-db-dc-전환", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

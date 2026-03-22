import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 DB DC 차이 | 머니위키",
  description: "DB형과 DC형 퇴직연금 차이점 알려드려요. 어떤 게 유리한지 비교해드릴게요",
  openGraph: { title: "퇴직연금 DB DC 차이", description: "DB형과 DC형 퇴직연금 차이점 알려드려요. 어떤 게 유리한지 비교해드릴게요", url: "https://jjyu.co.kr/w/퇴직연금-db-dc-차이" },
  alternates: { canonical: "https://jjyu.co.kr/w/퇴직연금-db-dc-차이" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

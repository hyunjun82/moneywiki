import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 종류와 DB형 DC형 IRP 차이점 비교 | 머니위키",
  description: "퇴직연금 종류와 차이점 알려드려요. DB형, DC형, IRP 중 나에게 맞는 게 뭔지 알아보세요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-종류" },
  openGraph: { title: "퇴직연금 종류와 DB형 DC형 IRP 차이점 비교", description: "퇴직연금 종류와 차이점 알려드려요. DB형, DC형, IRP 중 나에게 맞는 게 뭔지 알아보세요", url: "https://www.jjyu.co.kr/w/퇴직연금-종류", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

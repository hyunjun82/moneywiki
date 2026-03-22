import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 종류 DB형과 DC형 비교 | 머니위키",
  description: "퇴직연금이 뭔지 알려드려요. DB형, DC형, IRP 중 어떤 게 본인한테 유리한지 비교해봐요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금" },
  openGraph: { title: "퇴직연금 종류 DB형과 DC형 비교 | 머니위키", description: "퇴직연금이 뭔지 알려드려요. DB형, DC형, IRP 중 어떤 게 본인한테 유리한지 비교해봐요.", url: "https://www.jjyu.co.kr/w/퇴직연금", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

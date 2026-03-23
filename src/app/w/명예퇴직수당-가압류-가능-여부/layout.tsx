import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "명예퇴직수당 가압류 가능 여부 및 압류 범위 | 머니위키",
  description: "채무자가 명예퇴직수당 받는다는데 가압류할 수 있는지 궁금하시죠. 압류 가능 여부부터 압류 범위까지 자세히 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/명예퇴직수당-가압류-가능-여부" },
  openGraph: { title: "명예퇴직수당 가압류 가능 여부 및 압류 범위 | 머니위키", description: "채무자가 명예퇴직수당 받는다는데 가압류할 수 있는지 궁금하시죠. 압류 가능 여부부터 압류 범위까지 자세히 알려드려요.", url: "https://www.jjyu.co.kr/w/명예퇴직수당-가압류-가능-여부", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

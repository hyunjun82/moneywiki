import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 아르바이트 | 머니위키",
  description: "아르바이트도 3개월 이상 근무하면 연말정산 대상이에요. 기납부세액이 있으면 환급받을 수 있어요.",
  openGraph: { title: "연말정산 아르바이트 | 머니위키", description: "아르바이트도 3개월 이상 근무하면 연말정산 대상이에요. 기납부세액이 있으면 환급받을 수 있어요.", url: "https://www.jjyu.co.kr/w/연말정산-아르바이트", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-아르바이트" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

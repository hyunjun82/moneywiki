import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 자녀 세액공제 조건 | 머니위키",
  description: "연말정산 자녀 세액공제 조건",
  openGraph: { title: "연말정산 자녀 세액공제 조건", description: "연말정산 자녀 세액공제 조건", url: "https://jjyu.co.kr/w/연말정산-자녀-세액공제-조건" },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-자녀-세액공제-조건" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

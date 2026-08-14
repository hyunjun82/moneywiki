import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 보험료 공제",
  description: "건강보험료·고용보험료·노인장기요양보험료는 전액 소득공제되고, 보장성보험료는 12% 세액공제받아요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-보험료-공제" },
  openGraph: { title: "연말정산 보험료 공제", description: "건강보험료·고용보험료·노인장기요양보험료는 전액 소득공제되고, 보장성보험료는 12% 세액공제받아요.", url: "https://www.jjyu.co.kr/w/연말정산-보험료-공제", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

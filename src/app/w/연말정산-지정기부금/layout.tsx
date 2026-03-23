import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기부금 공제, 연말정산에서 얼마나 돌려받나요? 지정기부금 공제율과 한도 | 머니위키",
  description: "지정기부금은 소득의 30% 한도 내에서 15%(1천만원 초과분 30%) 세액공제돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-지정기부금" },
  openGraph: { title: "기부금 공제, 연말정산에서 얼마나 돌려받나요? 지정기부금 공제율과 한도 | 머니위키", description: "지정기부금은 소득의 30% 한도 내에서 15%(1천만원 초과분 30%) 세액공제돼요.", url: "https://www.jjyu.co.kr/w/연말정산-지정기부금", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

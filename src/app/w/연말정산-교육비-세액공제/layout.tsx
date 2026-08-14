import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 교육비, 얼마까지 공제되나? 대상 항목과 세액공제 한도",
  description: "교육비 세액공제는 본인 한도 없음, 자녀 초중고 300만원·대학 900만원 한도로 15% 공제예요. 대상 항목과 한도를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-교육비-세액공제" },
  openGraph: { title: "연말정산 교육비, 얼마까지 공제되나? 대상 항목과 세액공제 한도", description: "교육비 세액공제는 본인 한도 없음, 자녀 초중고 300만원·대학 900만원 한도로 15% 공제예요. 대상 항목과 한도를 정리했어요.", url: "https://www.jjyu.co.kr/w/연말정산-교육비-세액공제", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "특별세액공제 항목별 한도, 보험료 의료비 교육비 기부금",
  description: "연말정산 특별세액공제 항목별 한도를 정리했어요. 보험료·의료비·교육비·기부금·월세 공제 한도와 세율이에요.",
  openGraph: { title: "특별세액공제 항목별 한도 | 머니위키", description: "특별세액공제 항목별 한도 정리예요.", url: "https://www.jjyu.co.kr/w/연말정산-특별세액공제-한도", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-특별세액공제-한도" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 표준공제 13만원, 항목별 공제와 비교 기준 | 머니위키",
  description: "특별소득공제와 특별세액공제 합계가 13만원 미만이면 표준공제가 유리해요. 비교 기준과 적용 조건을 정리했어요.",
  openGraph: { title: "연말정산 표준공제 13만원, 항목별 공제와 비교 기준 | 머니위키", description: "표준공제와 항목별 공제 비교 기준이에요.", url: "https://www.jjyu.co.kr/w/연말정산-표준공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-표준공제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

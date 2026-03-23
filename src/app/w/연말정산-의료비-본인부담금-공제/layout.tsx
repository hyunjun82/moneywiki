import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 의료비 본인부담금 공제 | 머니위키",
  description: "건강보험 적용 후 본인부담금과 비급여 진료비 모두 15% 세액공제 대상이에요. 실손보험 환급금은 제외돼요",
  openGraph: { title: "연말정산 의료비 본인부담금 공제 | 머니위키", description: "건강보험 적용 후 본인부담금과 비급여 진료비 모두 15% 세액공제 대상이에요. 실손보험 환급금은 제외돼요", url: "https://www.jjyu.co.kr/w/연말정산-의료비-본인부담금-공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-의료비-본인부담금-공제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

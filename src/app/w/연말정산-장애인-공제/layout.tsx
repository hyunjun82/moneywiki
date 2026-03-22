import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 장애인 공제 | 머니위키",
  description: "장애인 부양가족 1명당 최대 84만원 돌려받아요. 암·치매 환자도 장애인증명서 있으면 공제돼요",
  openGraph: { title: "연말정산 장애인 공제 | 머니위키", description: "장애인 부양가족 1명당 최대 84만원 돌려받아요. 암·치매 환자도 장애인증명서 있으면 공제돼요", url: "https://www.jjyu.co.kr/w/연말정산-장애인-공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-장애인-공제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

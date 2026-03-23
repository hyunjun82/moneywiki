import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 라식 라섹 | 머니위키",
  description: "라식, 라섹 수술비는 의료비 세액공제가 돼요. 본인은 한도 없이 전액 15% 공제예요. 수술비 300만원이면 45만원 돌려받아요",
  openGraph: { title: "연말정산 라식 라섹 | 머니위키", description: "라식, 라섹 수술비는 의료비 세액공제가 돼요. 본인은 한도 없이 전액 15% 공제예요. 수술비 300만원이면 45만원 돌려받아요", url: "https://www.jjyu.co.kr/w/연말정산-라식-라섹", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-라식-라섹" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 기납부세액 | 머니위키",
  description: "기납부세액은 매달 월급에서 떼간 세금 합계예요. 이게 결정세액보다 많으면 차액을 환급받아요",
  openGraph: { title: "연말정산 기납부세액 | 머니위키", description: "기납부세액은 매달 월급에서 떼간 세금 합계예요. 이게 결정세액보다 많으면 차액을 환급받아요", url: "https://www.jjyu.co.kr/w/연말정산-기납부세액", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-기납부세액" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 대중교통 공제율 80%와 한도, 버스 지하철 KTX | 머니위키",
  description: "대중교통비 소득공제율이 80%예요. 버스·지하철·KTX가 대상이고 추가공제 한도는 300만원이에요.",
  openGraph: { title: "연말정산 대중교통 공제율 80%와 한도 | 머니위키", description: "대중교통비 소득공제 조건과 한도예요.", url: "https://www.jjyu.co.kr/w/연말정산-대중교통-공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-대중교통-공제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

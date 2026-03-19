import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 대중교통 신용카드 40% 공제 한도 | 머니위키",
  description: "지하철·버스·택시·KTX 신용카드 결제 시 40% 소득공제. 기본 300만원 + 대중교통 추가 100만원. 전통시장·도서공연비와 최대 600만원.",
  openGraph: {
    title: "연말정산 대중교통 신용카드 40% 공제 한도",
    description: "대중교통 40% 공제율 + 추가 100만원 한도 계산법.",
    url: "https://jjyu.co.kr/w/연말정산-대중교통-신용카드",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/연말정산-대중교통-신용카드",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

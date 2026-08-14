import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대중교통 공제율 80%, 얼마나 돌려받을까? 연말정산 교통비 소득공제",
  description: "2025년 귀속 연말정산에서 대중교통 소득공제율이 80%예요. 버스·지하철·KTX 이용액 공제 계산법, 한도, 절세 전략을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-대중교통" },
  openGraph: {
    title: "대중교통 공제율 80%, 얼마나 돌려받을까? 연말정산 교통비 소득공제 | 머니위키",
    description: "2025년 귀속 연말정산에서 대중교통 소득공제율이 80%예요. 버스·지하철·KTX 이용액 공제 계산법, 한도, 절세 전략을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-대중교통",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

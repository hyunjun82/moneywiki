import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "DSR 계산 방법 2026 | 머니위키",
  description: "대출 한도가 궁금할 때 DSR 계산하는 방법을 알려드려요. 2026년 스트레스 DSR 3단계 기준으로 쉽게 계산해보세요.",
  openGraph: { title: "DSR 계산 방법 2026 | 머니위키", description: "대출 한도가 궁금할 때 DSR 계산하는 방법을 알려드려요. 2026년 스트레스 DSR 3단계 기준으로 쉽게 계산해보세요.", url: "https://www.jjyu.co.kr/w/DSR-계산", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/DSR-계산" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

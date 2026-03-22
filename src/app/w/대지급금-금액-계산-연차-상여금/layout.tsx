import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "대지급금 금액 계산 방법 | 연차 상여금 통상임금 포함 여부 | 머니위키",
  description: "대지급금 신청 시 연차수당이나 상여금도 포함되는지 궁금하신가요? 통상임금 포함 여부와 항목별 계산 방법을 알려드려요.",
  openGraph: { title: "대지급금 금액 계산 방법 | 연차 상여금 통상임금 포함 여부 | 머니위키", description: "대지급금 신청 시 연차수당이나 상여금도 포함되는지 궁금하신가요? 통상임금 포함 여부와 항목별 계산 방법을 알려드려요.", url: "https://www.jjyu.co.kr/w/대지급금-금액-계산-연차-상여금", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/대지급금-금액-계산-연차-상여금" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

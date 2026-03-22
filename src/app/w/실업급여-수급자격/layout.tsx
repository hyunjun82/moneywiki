import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 수급자격 인정 기준: 가입기간 180일 및 비자발적 퇴사 요건 | 머니위키",
  description: "실업급여 받을 수 있는 자격이 되는지 궁금하시죠. 고용보험 가입기간, 퇴직 사유 등 조건을 자세히 알려드려요",
  openGraph: { title: "실업급여 수급자격 인정 기준: 가입기간 180일 및 비자발적 퇴사 요건 | 머니위키", description: "실업급여 받을 수 있는 자격이 되는지 궁금하시죠. 고용보험 가입기간, 퇴직 사유 등 조건을 자세히 알려드려요", url: "https://www.jjyu.co.kr/w/실업급여-수급자격", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-수급자격" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

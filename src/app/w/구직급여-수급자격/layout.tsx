import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "구직급여 수급자격·신청 조건·지급 기간 총정리 | 머니위키",
  description: "실업급여 받으려면 180일 이상 고용보험 납부하고 비자발적 퇴사여야 해요. 구직급여 조건부터 신청 방법까지 한눈에 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/구직급여-수급자격" },
  openGraph: {
    title: "구직급여 수급자격·신청 조건·지급 기간 총정리",
    description: "실업급여 받으려면 180일 이상 고용보험 납부하고 비자발적 퇴사여야 해요. 구직급여 조건부터 신청 방법까지 한눈에 알려드려요.",
    url: "https://www.jjyu.co.kr/w/구직급여-수급자격",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

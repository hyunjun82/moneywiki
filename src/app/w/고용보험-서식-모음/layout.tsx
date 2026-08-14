import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "고용보험 서식 모음 - 실업급여 신청에 필요한 양식 총정리",
  description: "고용보험 관련 서식을 한 곳에 모았습니다. 실업급여 신청서, 이직확인서, 수급자격인정 신청서 등 2026년 최신 양식을 다운로드하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고용보험-서식-모음" },
  openGraph: {
    title: "고용보험 서식 모음 - 실업급여 신청에 필요한 양식 총정리",
    description: "고용보험 관련 서식을 한 곳에 모았습니다. 실업급여 신청서, 이직확인서, 수급자격인정 신청서 등 2026년 최신 양식을 다운로드하세요.",
    url: "https://www.jjyu.co.kr/w/고용보험-서식-모음",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

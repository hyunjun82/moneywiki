import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "간병으로 퇴직해도 실업급여 될까? 자격 기준과 신청 방법",
  description: "부모님 간병으로 퇴직해도 30일 이상 간병이 필요하고 회사가 휴직을 거부했다면 정당한 이직 사유로 인정돼요. 자격 기준과 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/간병-사유-퇴직-실업급여" },
  openGraph: {
    title: "간병으로 퇴직해도 실업급여 될까? 자격 기준과 신청 방법 | 머니위키",
    description: "부모님 간병으로 퇴직해도 30일 이상 간병이 필요하고 회사가 휴직을 거부했다면 정당한 이직 사유로 인정돼요. 자격 기준과 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/간병-사유-퇴직-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

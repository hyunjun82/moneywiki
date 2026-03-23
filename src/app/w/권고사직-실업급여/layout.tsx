import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "권고사직 받으면 실업급여 받을 수 있을까? 수급 조건과 이직확인서 처리 | 머니위키",
  description: "권고사직은 비자발적 퇴사로 실업급여 대상이에요. 고용보험 180일 요건, 이직확인서 사유 확인, 신청 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/권고사직-실업급여" },
  openGraph: {
    title: "권고사직 받으면 실업급여 받을 수 있을까? 수급 조건과 이직확인서 처리 | 머니위키",
    description: "권고사직은 비자발적 퇴사로 실업급여 대상이에요. 고용보험 180일 요건, 이직확인서 사유 확인, 신청 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/권고사직-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

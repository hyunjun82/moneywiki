import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "파견직 계약 끝나면 실업급여? 수급 조건과 신청 절차",
  description: "파견직도 고용보험 가입 대상이라 실업급여를 받을 수 있어요. 파견계약 만료 시 비자발적 퇴사로 인정되며, 이직확인서는 파견회사가 발급해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/파견직-실업급여" },
  openGraph: {
    title: "파견직 계약 끝나면 실업급여? 수급 조건과 신청 절차 | 머니위키",
    description: "파견직도 고용보험 가입 대상이라 실업급여를 받을 수 있어요. 파견계약 만료 시 비자발적 퇴사로 인정되며, 이직확인서는 파견회사가 발급해요.",
    url: "https://www.jjyu.co.kr/w/파견직-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

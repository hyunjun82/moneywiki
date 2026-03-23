import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 받을 수 있을까? 수급자격 조건과 신청 방법 | 머니위키",
  description: "고용보험 180일 이상 가입, 비자발적 퇴사, 구직의사 세 가지만 충족하면 실업급여를 받을 수 있어요. 정규직·계약직·알바 모두 대상이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/실업급여-자격",
  },
  openGraph: {
    title: "실업급여 수급자격 조건과 신청 방법",
    description: "180일 가입, 비자발적 퇴사, 구직의사. 3가지 조건 정리.",
    url: "https://www.jjyu.co.kr/w/실업급여-자격",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

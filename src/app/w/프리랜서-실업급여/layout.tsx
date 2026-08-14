import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "프리랜서도 실업급여 받을까? 고용보험 가입부터 신청까지",
  description: "프리랜서도 고용보험에 가입돼 있으면 실업급여를 받을 수 있어요. 특수고용직·예술인 의무가입 대상과 수급 조건, 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/프리랜서-실업급여" },
  openGraph: {
    title: "프리랜서도 실업급여 받을까? 고용보험 가입부터 신청까지 | 머니위키",
    description: "프리랜서도 고용보험에 가입돼 있으면 실업급여를 받을 수 있어요. 특수고용직·예술인 의무가입 대상과 수급 조건, 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/프리랜서-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

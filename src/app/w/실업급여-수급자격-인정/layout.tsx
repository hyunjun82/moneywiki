import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 수급자격 인정, 고용센터 심사 절차와 준비물 | 머니위키",
  description: "실업급여 수급자격 신청 순서가 헷갈리죠. 온라인 교육부터 고용센터 방문, 14일 심사까지 전 과정을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-수급자격-인정" },
  openGraph: {
    title: "실업급여 수급자격 인정, 고용센터 심사 절차와 준비물 | 머니위키",
    description: "실업급여 수급자격 신청 순서가 헷갈리죠. 온라인 교육부터 고용센터 방문, 14일 심사까지 전 과정을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-수급자격-인정",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

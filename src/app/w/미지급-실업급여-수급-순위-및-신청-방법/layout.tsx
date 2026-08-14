import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "미지급 실업급여, 누가 받을 수 있을까? 수급 순위와 청구 기준",
  description: "실업급여 수급자가 사망하면 유족이 미지급 실업급여를 대신 받을 수 있죠. 수급 순위, 신청 서류, 소멸시효까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/미지급-실업급여-수급-순위-및-신청-방법" },
  openGraph: {
    title: "미지급 실업급여, 누가 받을 수 있을까? 수급 순위와 청구 기준 | 머니위키",
    description: "실업급여 수급자가 사망하면 유족이 미지급 실업급여를 대신 받을 수 있죠. 수급 순위, 신청 서류, 소멸시효까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/미지급-실업급여-수급-순위-및-신청-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

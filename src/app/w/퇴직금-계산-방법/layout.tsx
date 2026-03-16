import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 계산 방법, 공식과 실제 사례로 쉽게 이해하기 | 머니위키",
  description: "퇴직금 계산 공식은 1일 평균임금 x 30일 x 근속연수예요. 식대·교통비 포함 여부, 회사 계산과 차이나는 이유까지 실제 사례로 풀어드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-계산-방법" },
  openGraph: {
    title: "퇴직금 계산 방법, 공식과 실제 사례로 쉽게 이해하기 | 머니위키",
    description: "퇴직금 계산 공식은 1일 평균임금 x 30일 x 근속연수예요. 식대·교통비 포함 여부, 회사 계산과 차이나는 이유까지 실제 사례로 풀어드려요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-계산-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

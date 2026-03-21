import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "사업소득 원천징수 3.3%, 왜 떼고 어떻게 신고하나요? | 머니위키",
  description: "프리랜서 용역비에서 3.3%를 떼는 이유, 소득세 3%와 지방소득세 0.3% 계산 구조, 홈택스 신고 방법과 5월 종합소득세 환급까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/사업소득-원천징수-3-3-percent" },
  openGraph: {
    title: "사업소득 원천징수 3.3%, 왜 떼고 어떻게 신고하나요? | 머니위키",
    description: "프리랜서 용역비에서 3.3%를 떼는 이유, 소득세 3%와 지방소득세 0.3% 계산 구조, 홈택스 신고 방법과 5월 종합소득세 환급까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/사업소득-원천징수-3-3-percent",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

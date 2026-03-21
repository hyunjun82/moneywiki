import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "면세사업자 현황신고 방법과 기한 | 머니위키",
  description: "면세사업자 사업장현황신고 대상, 2월 10일 기한, 홈택스 신고 절차와 제출 서류를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/면세사업자-현황신고" },
  openGraph: {
    title: "면세사업자 현황신고 방법과 기한 | 머니위키",
    description: "면세사업자 사업장현황신고 대상, 기한, 홈택스 신고 절차를 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/면세사업자-현황신고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

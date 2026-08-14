import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "용역제공자 과세자료 제출 기한 홈택스 신고",
  description: "프리랜서 용역제공자 과세자료 제출 기한과 홈택스 신고 방법을 알려드려요. 9개 대상 업종과 세액공제 혜택까지 한 번에 정리해요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/용역제공자-과세자료-제출" },
  openGraph: {
    title: "용역제공자 과세자료 제출 기한 홈택스 신고",
    description: "프리랜서 용역제공자 과세자료 제출 기한과 홈택스 신고 방법을 알려드려요. 9개 대상 업종과 세액공제 혜택까지 한 번에 정리해요",
    url: "https://www.jjyu.co.kr/w/용역제공자-과세자료-제출",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

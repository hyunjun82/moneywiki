import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 세금, 얼마나 떼이나요?",
  description: "퇴직금에도 퇴직소득세가 붙어요. 근속연수가 길수록 세금이 줄고, IRP로 받으면 추가 절세가 가능하죠. 계산법과 절세 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-세금" },
  openGraph: {
    title: "퇴직금 세금, 얼마나 떼이나요? | 머니위키",
    description: "퇴직금에도 퇴직소득세가 붙어요. 근속연수가 길수록 세금이 줄고, IRP로 받으면 추가 절세가 가능하죠. 계산법과 절세 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-세금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

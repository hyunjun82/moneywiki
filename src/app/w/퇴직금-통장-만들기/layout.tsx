import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 통장 만들기, 어디서 어떻게 하나요?",
  description: "퇴직금을 받을 IRP 계좌 개설 방법을 안내해요. 은행·증권사·보험사별 차이와 수수료를 비교했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-통장-만들기" },
  openGraph: {
    title: "퇴직금 통장 만들기, 어디서 어떻게 하나요? | 머니위키",
    description: "퇴직금을 받을 IRP 계좌 개설 방법을 안내해요. 은행·증권사·보험사별 차이와 수수료를 비교했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-통장-만들기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

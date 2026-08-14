import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "개인퇴직연금 IRP 가입, 어디서 하면 유리할까? 비교와 절차",
  description: "IRP 가입은 은행·증권사·보험사 어디서든 가능하지만, 수수료와 ETF 라인업이 달라요. 세액공제 900만원 한도까지 챙기는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/개인퇴직연금-가입" },
  openGraph: {
    title: "개인퇴직연금 IRP 가입, 어디서 하면 유리할까? 비교와 절차 | 머니위키",
    description: "IRP 가입은 은행·증권사·보험사 어디서든 가능하지만, 수수료와 ETF 라인업이 달라요. 세액공제 900만원 한도까지 챙기는 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/개인퇴직연금-가입",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

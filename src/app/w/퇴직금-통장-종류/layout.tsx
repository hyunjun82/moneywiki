import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 통장 종류, 어떤 계좌를 선택해야 할까?",
  description: "퇴직금을 받을 수 있는 통장 종류를 비교했어요. DB형·DC형·IRP 계좌의 차이와 은행 IRP vs 증권사 IRP를 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-통장-종류" },
  openGraph: {
    title: "퇴직금 통장 종류, 어떤 계좌를 선택해야 할까? | 머니위키",
    description: "퇴직금을 받을 수 있는 통장 종류를 비교했어요. DB형·DC형·IRP 계좌의 차이와 은행 IRP vs 증권사 IRP를 안내해요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-통장-종류",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

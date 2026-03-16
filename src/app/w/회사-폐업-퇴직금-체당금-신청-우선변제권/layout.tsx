import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "회사 폐업 퇴직금 체당금 신청과 우선변제권 | 머니위키",
  description: "회사 폐업 시 체당금 제도와 우선변제권을 활용하면 퇴직금을 받을 수 있어요. 신청 자격, 한도, 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/회사-폐업-퇴직금-체당금-신청-우선변제권" },
  openGraph: {
    title: "회사 폐업 퇴직금 체당금 신청과 우선변제권 | 머니위키",
    description: "회사 폐업 시 체당금 제도와 우선변제권을 활용하면 퇴직금을 받을 수 있어요. 신청 자격, 한도, 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/회사-폐업-퇴직금-체당금-신청-우선변제권",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

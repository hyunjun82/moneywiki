import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "도산등사실인정 요건과 신청 방법 | 머니위키",
  description: "회사 폐업 후 밀린 임금을 못 받고 있다면 도산등사실인정을 받으세요. 사업 폐지·영업양도 시 요건, 신청 절차, 필요 서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/도산등사실인정-사업-폐지-영업양도" },
  openGraph: {
    title: "도산등사실인정 요건과 신청 방법 | 머니위키",
    description: "회사 폐업 후 밀린 임금을 못 받고 있다면 도산등사실인정을 받으세요. 사업 폐지·영업양도 시 요건, 신청 절차, 필요 서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/도산등사실인정-사업-폐지-영업양도",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

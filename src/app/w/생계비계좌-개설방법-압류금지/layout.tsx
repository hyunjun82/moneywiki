import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "압류금지 생계비계좌 개설 방법(행복지킴이통장) | 머니위키",
  description: "압류금지 생계비계좌(행복지킴이통장) 개설 요건, 보호 금액 한도, 법원 신청 절차와 필요 서류를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/생계비계좌-개설방법-압류금지" },
  openGraph: {
    title: "압류금지 생계비계좌 개설 방법(행복지킴이통장) | 머니위키",
    description: "압류금지 생계비계좌 개설 요건, 보호 금액 한도, 법원 신청 절차와 필요 서류를 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/생계비계좌-개설방법-압류금지",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

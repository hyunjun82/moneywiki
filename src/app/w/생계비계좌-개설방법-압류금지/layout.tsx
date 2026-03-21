import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "생계비계좌 개설방법과 압류금지 250만원 한도 | 머니위키",
  description: "2026년 2월부터 시중은행에서 1인 1계좌 개설 가능. 월 250만원까지 압류 없이 사용. 신분증만 챙기면 돼요.",
  openGraph: {
    title: "생계비계좌 개설방법과 압류금지 250만원 한도",
    description: "통장 압류 걱정 없이 월급 쓰는 방법. 2026년 2월 시행, 개설 4단계 정리.",
    url: "https://jjyu.co.kr/w/생계비계좌-개설방법-압류금지",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/생계비계좌-개설방법-압류금지",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

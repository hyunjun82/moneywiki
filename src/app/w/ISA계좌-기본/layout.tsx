import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ISA 계좌 중개형·서민형·일반형 차이, 비과세 400만원 받는 절세 통장",
  description: "ISA 계좌 서민형은 400만원, 일반형은 200만원까지 비과세예요. 연 5,000만원 이하 소득자라면 서민형이 유리해요. 유형 비교와 개설 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/ISA계좌-기본" },
  openGraph: {
    title: "ISA 계좌 중개형·서민형·일반형 차이, 비과세 400만원 받는 절세 통장 | 머니위키",
    description: "ISA 계좌 서민형은 400만원, 일반형은 200만원까지 비과세예요. 연 5,000만원 이하 소득자라면 서민형이 유리해요.",
    url: "https://www.jjyu.co.kr/w/ISA계좌-기본",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

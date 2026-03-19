import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ISA 계좌 중개형·서민형·일반형 차이 | 머니위키",
  description: "ISA 계좌 유형 비교: 서민형 400만원 비과세, 일반형 200만원 비과세. 중개형 vs 신탁형 차이. 5분 개설 방법.",
  openGraph: {
    title: "ISA 계좌 중개형·서민형·일반형 차이",
    description: "소득 5,000만원 이하면 서민형으로 400만원 비과세. 유형 선택과 개설 방법 정리.",
    url: "https://jjyu.co.kr/w/ISA계좌-기본",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/ISA계좌-기본",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

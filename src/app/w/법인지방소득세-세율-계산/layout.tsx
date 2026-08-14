import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "법인지방소득세 세율·계산법 | 법인세의 10%가 아닌 이유 | 머니위키",
  description:
    "법인지방소득세는 법인세액에 10%를 곱하는 것이 아니라 과세표준에 0.9~2.4% 누진세율을 적용합니다. 4개 구간별 세율과 산출세액 계산법, 흔한 오해를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/법인지방소득세-세율-계산" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

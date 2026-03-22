import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "종신보험 상속세 절세: 계약 구조별 비과세 전략 | 머니위키",
  description: "종신보험으로 상속세를 절세하려면 계약자와 수익자 구조가 핵심이에요. 자녀를 계약자로 지정하면 사망보험금이 상속재산에서 제외되고, 최대 50% 세금을 아낄 수 있어요",
  openGraph: { title: "종신보험 상속세 절세: 계약 구조별 비과세 전략", description: "종신보험으로 상속세를 절세하려면 계약자와 수익자 구조가 핵심이에요. 자녀를 계약자로 지정하면 사망보험금이 상속재산에서 제외되고, 최대 50% 세금을 아낄 수 있어요", url: "https://jjyu.co.kr/w/종신보험-상속세-절세-방법" },
  alternates: { canonical: "https://jjyu.co.kr/w/종신보험-상속세-절세-방법" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

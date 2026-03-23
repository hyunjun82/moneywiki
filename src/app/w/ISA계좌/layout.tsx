import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "ISA계좌 비과세 한도 200만원 400만원 차이 | 머니위키",
  description: "ISA는 주식·펀드·예금을 한 계좌에서 운용하며 200~400만원까지 비과세 혜택 받아요. 일반형과 서민형 차이, 중개형과 신탁형 선택 기준을 알려드릴게요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/ISA계좌" },
  openGraph: { title: "ISA계좌 비과세 한도 200만원 400만원 차이", description: "ISA는 주식·펀드·예금을 한 계좌에서 운용하며 200~400만원까지 비과세 혜택 받아요. 일반형과 서민형 차이, 중개형과 신탁형 선택 기준을 ", url: "https://www.jjyu.co.kr/w/ISA계좌", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

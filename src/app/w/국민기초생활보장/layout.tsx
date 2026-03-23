import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "국민기초생활보장 수급 조건 및 급여: 생계·의료·주거·교육급여 | 머니위키",
  description: "기초생활보장 받을 수 있는지 궁금하시죠. 소득인정액이 기준 이하면 생계, 의료, 주거, 교육급여를 받을 수 있어요",
  openGraph: { title: "국민기초생활보장 수급 조건 및 급여: 생계·의료·주거·교육급여", description: "기초생활보장 받을 수 있는지 궁금하시죠. 소득인정액이 기준 이하면 생계, 의료, 주거, 교육급여를 받을 수 있어요", url: "https://jjyu.co.kr/w/국민기초생활보장" },
  alternates: { canonical: "https://jjyu.co.kr/w/국민기초생활보장" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

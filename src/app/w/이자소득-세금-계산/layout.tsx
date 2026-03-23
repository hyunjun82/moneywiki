export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이자소득 세금 계산 — 세율 15.4%부터 종합과세까지 | 머니위키",
  description: "예금 이자에 15.4% 원천징수되고, 금융소득 2천만원 넘으면 종합과세돼요. 상품별 세율, 계산법, 절세 전략을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이자소득-세금-계산" },
  openGraph: {
    title: "이자소득 세금 계산 — 세율 15.4%부터 종합과세까지 | 머니위키",
    description: "예금 이자에 15.4% 원천징수되고, 금융소득 2천만원 넘으면 종합과세돼요. 상품별 세율, 계산법, 절세 전략을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/이자소득-세금-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

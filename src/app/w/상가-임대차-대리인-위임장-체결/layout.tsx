import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "상가 임대차 대리인 위임장 — 안전한 계약 체결 방법 | 머니위키",
  description: "상가 계약에서 건물주 대신 대리인이 나왔다면 위임장·인감증명서·직접 통화 3가지를 반드시 확인하세요. 빠지면 계약이 무효가 될 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상가-임대차-대리인-위임장-체결" },
  openGraph: {
    title: "상가 임대차 대리인 위임장 — 안전한 계약 체결 방법 | 머니위키",
    description: "상가 계약에서 건물주 대신 대리인이 나왔다면 위임장·인감증명서·직접 통화 3가지를 반드시 확인하세요. 빠지면 계약이 무효가 될 수 있어요.",
    url: "https://www.jjyu.co.kr/w/상가-임대차-대리인-위임장-체결",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

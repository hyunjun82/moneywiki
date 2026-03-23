import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "대출 갈아타기, 정말 이자가 줄어드나요? 조건과 비교 방법 | 머니위키",
  description: "기존 고금리 대출을 저금리로 전환하면 수백만원 절약돼요. 갈아타기 조건과 비교 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대출-갈아타기-조건" },
  openGraph: { title: "대출 갈아타기, 정말 이자가 줄어드나요? 조건과 비교 방법 | 머니위키", description: "기존 고금리 대출을 저금리로 전환하면 수백만원 절약돼요. 갈아타기 조건과 비교 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/대출-갈아타기-조건", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

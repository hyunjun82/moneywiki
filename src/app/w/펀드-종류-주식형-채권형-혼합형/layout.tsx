import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "펀드 종류 비교 — 주식형·채권형·혼합형 차이와 선택법 | 머니위키",
  description: "주식형은 주식 60% 이상, 채권형은 채권 60% 이상, 혼합형은 그 사이예요. 수익률·위험도·수수료 비교로 내 성향에 맞는 펀드를 골라보세요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/펀드-종류-주식형-채권형-혼합형",
  },
  openGraph: {
    title: "펀드 종류 비교 — 주식형·채권형·혼합형 차이와 선택법",
    description: "펀드 3종 비교표, 투자 성향별 선택법, 수수료 구조까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/펀드-종류-주식형-채권형-혼합형",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

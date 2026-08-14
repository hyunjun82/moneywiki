import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "상가 묵시적갱신, 계약이 자동 연장되나? 갱신 조건과 임대인 거절 사유",
  description: "상가 묵시적갱신, 계약이 자동 연장되나? 갱신 조건과 임대인 거절 사유에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상가건물-묵시적갱신-계약연장" },
  openGraph: { title: "상가 묵시적갱신, 계약이 자동 연장되나? 갱신 조건과 임대인 거절 사유", description: "상가 묵시적갱신, 계약이 자동 연장되나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/상가건물-묵시적갱신-계약연장", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "가명통장 개설하면 처벌받나? 실명법 위반과 벌칙 | 머니위키",
  description: "가명통장 개설하면 처벌받나? 실명법 위반과 벌칙에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/가명통장-개설-실명법-위반-처벌" },
  openGraph: { title: "가명통장 개설하면 처벌받나? 실명법 위반과 벌칙", description: "가명통장 개설하면 처벌받나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/가명통장-개설-실명법-위반-처벌", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "회사 야유회에서 다치면 산재 되나? 행사 중 사고의 산재 인정 기준 | 머니위키",
  description: "회사 야유회에서 다치면 산재 되나? 행사 중 사고의 산재 인정 기준에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/산재보상-회사-주최-야유회-사고" },
  openGraph: { title: "회사 야유회에서 다치면 산재 되나? 행사 중 사고의 산재 인정 기준", description: "회사 야유회에서 다치면 산재 되나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/산재보상-회사-주최-야유회-사고", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

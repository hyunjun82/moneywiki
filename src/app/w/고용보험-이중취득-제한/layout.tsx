import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고용보험 이중취득 제한 — 두 직장 다니면 어디서 가입되나요?",
  description: "투잡·N잡하면 고용보험이 두 곳 다 가입되나요? 고용보험법 제18조에 따라 피보험자격은 한 사업장에서만 취득돼요. 판단 기준과 실업급여 산정 방식을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고용보험-이중취득-제한" },
  openGraph: {
    title: "고용보험 이중취득 제한 — 두 직장 다니면 어디서 가입되나요? | 머니위키",
    description: "투잡·N잡하면 고용보험이 두 곳 다 가입되나요? 고용보험법 제18조에 따라 피보험자격은 한 사업장에서만 취득돼요.",
    url: "https://www.jjyu.co.kr/w/고용보험-이중취득-제한",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

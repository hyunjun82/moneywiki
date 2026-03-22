import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연금저축 생명보험사 이전 — 절차, 수수료, 종신연금 전환 | 머니위키",
  description: "연금저축을 생명보험사로 이전하면 세제혜택 그대로 유지하면서 종신연금 전환이 가능해요. 4단계 이전 절차와 수수료, 제한 사유를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연금저축-생명보험사-이전",
  },
  openGraph: {
    title: "연금저축 생명보험사 이전 — 절차와 수수료",
    description: "이전은 해지가 아니라 세제혜택 유지. 4단계 절차와 종신연금 전환 조건을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연금저축-생명보험사-이전",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

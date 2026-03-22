import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 외국인 근로자 — 거주자·비거주자 구분과 단일세율 선택법 | 머니위키",
  description: "외국인 근로자 183일 이상 거주하면 거주자로 연말정산 대상이에요. 5년 이내 근무자는 19% 단일세율 선택 가능하고, 비거주자는 20.9% 원천징수만 해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-외국인",
  },
  openGraph: {
    title: "연말정산 외국인 근로자 — 거주자·비거주자 구분과 단일세율 선택법",
    description: "183일 기준 거주자 판단, 19% 단일세율 vs 누진세율 비교, 조세조약 면세까지 외국인 연말정산 전체 흐름을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-외국인",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

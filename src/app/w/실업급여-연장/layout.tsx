import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 기간 끝났는데 아직 취업 못 했다면? 연장급여 3종류와 신청 방법 | 머니위키",
  description: "훈련연장(최대 2년, 100%), 개별연장(60일, 70%), 특별연장(60일, 70%) 세 가지 연장급여로 기본 실업급여 이후에도 추가 수급이 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/실업급여-연장",
  },
  openGraph: {
    title: "실업급여 연장급여 3종류와 신청 방법",
    description: "훈련연장 최대 2년, 개별·특별연장 각 60일. 조건과 신청 절차 정리.",
    url: "https://www.jjyu.co.kr/w/실업급여-연장",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

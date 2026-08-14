import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "5세대 실손보험 가입 조건 — 신규·전환 대상 구분 방법",
  description: "2026년 4월 이후 신규 가입자는 5세대 실손만 선택 가능해요. 기존 2~4세대는 재가입 시기에 순차 전환, 1세대·초기 2세대는 무심사 재매입 전환이 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/5세대-실손보험-가입-조건",
  },
  openGraph: {
    title: "5세대 실손보험 가입 조건 — 신규·전환 대상 구분 방법",
    description: "세대별 전환 일정과 무심사 재매입 조건을 정리했어요. 내가 신규 가입 대상인지, 기존 계약 전환 대상인지 바로 확인해보세요.",
    url: "https://www.jjyu.co.kr/w/5세대-실손보험-가입-조건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

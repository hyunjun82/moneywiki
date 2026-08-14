import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 과세표준 — 8단계 세율표와 계산 방법",
  description: "과세표준은 총급여에서 소득공제를 뺀 금액이에요. 2025년 귀속 기준 6%~45% 8단계 세율, 누진공제액과 실제 계산 예시까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-과세표준",
  },
  openGraph: {
    title: "연말정산 과세표준 — 세율표와 계산 방법",
    description: "과세표준 구간별 6%~45% 세율, 누진공제 계산법, 2025년 귀속 변경사항 정리.",
    url: "https://www.jjyu.co.kr/w/연말정산-과세표준",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

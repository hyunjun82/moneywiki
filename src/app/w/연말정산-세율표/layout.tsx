import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 세율표 — 과세표준 구간별 소득세율과 계산법",
  description: "2025년 귀속 소득세 세율은 6%~45%까지 8개 구간이에요. 과세표준 × 세율 - 누진공제액으로 산출세액을 직접 계산할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-세율표" },
  openGraph: {
    title: "연말정산 세율표 — 과세표준 구간별 소득세율과 계산법 | 머니위키",
    description: "2025년 귀속 소득세 세율은 6%~45%까지 8개 구간이에요. 과세표준 × 세율 - 누진공제액으로 산출세액을 직접 계산할 수 있어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-세율표",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

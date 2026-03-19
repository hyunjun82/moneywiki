import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "K-패스 환급 계산 — 월 교통비별 환급액 시뮬레이션 | 머니위키",
  description: "K-패스로 월 교통비를 얼마나 돌려받을 수 있는지 계산해봤어요. 일반 20%·청년 30%·저소득 53% 기준, 월 3만~15만원 구간별 환급액 표예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/K-패스-환급-계산" },
  openGraph: {
    title: "K-패스 환급 계산 — 월 교통비별 환급액 시뮬레이션 | 머니위키",
    description: "K-패스로 월 교통비를 얼마나 돌려받을 수 있는지 계산해봤어요. 일반 20%·청년 30%·저소득 53% 기준, 월 3만~15만원 구간별 환급액 표예요.",
    url: "https://www.jjyu.co.kr/w/K-패스-환급-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

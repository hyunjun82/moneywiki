import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "K-패스 환급 계산 — 내 교통비로 얼마 돌아오는지 바로 확인 | 머니위키",
  description: "K-패스로 내 교통비를 얼마나 돌려받는지 바로 계산해봐요. 일반 20%·청년 30%·저소득 53% 기준 환급 시뮬레이션 + 한도·주의사항까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/K-패스-환급-계산" },
  openGraph: {
    title: "K-패스 환급 계산 — 내 교통비로 얼마 돌아오는지 바로 확인",
    description: "K-패스로 내 교통비를 얼마나 돌려받는지 바로 계산해봐요. 일반 20%·청년 30%·저소득 53% 기준 환급 시뮬레이션이에요.",
    url: "https://www.jjyu.co.kr/w/K-패스-환급-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

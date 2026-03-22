import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직급여 제도, 어떻게 설정하나? DB·DC 비교부터 신고까지 | 머니위키",
  description: "DB형은 급여 확정, DC형은 기여금 확정. 근로자대표 동의 → 금융기관 계약 → 고용노동부 신고 순서로 설정해요. 2026년 기금형 퇴직연금과 푸른씨앗 정부 지원도 안내해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/퇴직급여-설정-방법",
  },
  openGraph: {
    title: "퇴직급여 제도, 어떻게 설정하나?",
    description: "DB·DC 비교 + 설정 절차 4단계 + 2026년 기금형 퇴직연금 안내.",
    url: "https://www.jjyu.co.kr/w/퇴직급여-설정-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

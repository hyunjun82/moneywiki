import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 디폴트옵션, 뭘 골라야 할까? TDF 선택법과 위험등급 비교",
  description: "디폴트옵션 위험등급 4단계 수익률 비교와 TDF 선택 기준을 정리했어요. 2025년 고위험 평균 수익률 14.9%, 금융사 앱에서 3분이면 설정 완료.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-디폴트옵션" },
  openGraph: {
    title: "퇴직연금 디폴트옵션, 뭘 골라야 할까? TDF 선택법과 위험등급 비교 | 머니위키",
    description: "디폴트옵션 위험등급 4단계 수익률 비교와 TDF 선택 기준을 정리했어요. 2025년 고위험 평균 수익률 14.9%, 금융사 앱에서 3분이면 설정 완료.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-디폴트옵션",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

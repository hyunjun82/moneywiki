import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "직업능력개발 수당 신청 방법과 금액 — 실업급여 추가 수당 | 머니위키",
  description: "실업급여 받으면서 직업훈련을 받으면 교통비·식비 수당을 추가로 받아요. 고용센터 지정 훈련 조건과 청구 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/직업능력개발-수당-신청-방법-및-금액" },
  openGraph: {
    title: "직업능력개발 수당 신청 방법과 금액 — 실업급여 추가 수당 | 머니위키",
    description: "실업급여 받으면서 직업훈련을 받으면 교통비·식비 수당을 추가로 받아요. 고용센터 지정 훈련 조건과 청구 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/직업능력개발-수당-신청-방법-및-금액",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

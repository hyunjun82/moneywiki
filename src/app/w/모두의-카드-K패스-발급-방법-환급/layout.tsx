import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "모두의 카드, K패스랑 뭐가 다를까? 발급 방법과 환급 기준 | 머니위키",
  description: "모두의 카드는 K패스 확장판이에요. 월 기준금액 초과 교통비 100% 환급, 기존 K패스 자동 적용, 대상별 기준금액을 정리해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/모두의-카드-K패스-발급-방법-환급" },
  openGraph: {
    title: "모두의 카드, K패스랑 뭐가 다를까? 발급 방법과 환급 기준 | 머니위키",
    description: "모두의 카드는 K패스 확장판이에요. 월 기준금액 초과 교통비 100% 환급, 기존 K패스 자동 적용돼요.",
    url: "https://www.jjyu.co.kr/w/모두의-카드-K패스-발급-방법-환급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

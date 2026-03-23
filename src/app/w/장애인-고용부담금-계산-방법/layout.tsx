export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "장애인 고용부담금, 우리 회사는 얼마 내야 할까? 의무고용률과 계산 방법 | 머니위키",
  description: "상시근로자 100명 이상 사업장의 장애인 고용부담금 계산법을 정리했어요. 의무고용률 3.1%, 부담기초액, 중증장애인 더블카운트까지 계산기로 바로 확인할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애인-고용부담금-계산-방법" },
  openGraph: {
    title: "장애인 고용부담금, 우리 회사는 얼마 내야 할까? 의무고용률과 계산 방법 | 머니위키",
    description: "상시근로자 100명 이상 사업장의 장애인 고용부담금 계산법을 정리했어요. 의무고용률 3.1%, 부담기초액, 중증장애인 더블카운트까지 계산기로 바로 확인할 수 있어요.",
    url: "https://www.jjyu.co.kr/w/장애인-고용부담금-계산-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

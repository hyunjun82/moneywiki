import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근로복지공단 퇴직연금 조회 — 푸른씨앗 적립금 확인 방법 | 머니위키",
  description: "근로복지공단 퇴직연금(푸른씨앗) 적립금, 수익률, 납입 내역을 조회하는 방법을 단계별로 정리했어요. pension.comwel.or.kr에서 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로복지공단-퇴직연금-조회" },
  openGraph: {
    title: "근로복지공단 퇴직연금 조회 — 푸른씨앗 적립금 확인 방법 | 머니위키",
    description: "근로복지공단 퇴직연금(푸른씨앗) 적립금, 수익률, 납입 내역을 조회하는 방법을 단계별로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/근로복지공단-퇴직연금-조회",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

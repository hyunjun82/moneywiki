import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부동산 매매 절차, 계약부터 등기까지 순서 정리 | 머니위키",
  description: "집 사는 절차가 헷갈리죠. 시세 조사 → 계약 → 잔금 → 등기 → 세금 납부 순서와 각 단계에서 주의할 점을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부동산-매매-절차-계약-등기-순서" },
  openGraph: {
    title: "부동산 매매 절차, 계약부터 등기까지 순서 정리 | 머니위키",
    description: "집 사는 절차가 헷갈리죠. 시세 조사 → 계약 → 잔금 → 등기 → 세금 납부 순서와 각 단계에서 주의할 점을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/부동산-매매-절차-계약-등기-순서",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "탄력근로제 운영 요건 — 단위기간별 조건·수당 계산법 | 머니위키",
  description: "2주·3개월·6개월 단위별 도입 요건, 서면 합의 필수 내용, 주 52시간 한도, 가산수당 50% 계산법, 중도 퇴사 시 정산까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/탄력근로제-운영-요건" },
  openGraph: {
    title: "탄력근로제 운영 요건 — 단위기간별 조건·수당 계산법 | 머니위키",
    description: "2주·3개월·6개월 단위별 도입 요건, 서면 합의 필수 내용, 주 52시간 한도, 가산수당 50% 계산법, 중도 퇴사 시 정산까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/탄력근로제-운영-요건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

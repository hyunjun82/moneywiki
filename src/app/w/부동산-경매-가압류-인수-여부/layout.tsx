import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 가압류 인수 여부 — 말소기준권리로 판단하는 방법",
  description: "경매 부동산에 가압류가 있으면 낙찰 후 인수되는지 말소되는지 말소기준권리로 판단해요. 등기부등본 읽는 법과 사례별 판단 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부동산-경매-가압류-인수-여부" },
  openGraph: {
    title: "경매 가압류 인수 여부 — 말소기준권리로 판단하는 방법 | 머니위키",
    description: "경매 부동산에 가압류가 있으면 낙찰 후 인수되는지 말소되는지 말소기준권리로 판단해요. 등기부등본 읽는 법과 사례별 판단 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/부동산-경매-가압류-인수-여부",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

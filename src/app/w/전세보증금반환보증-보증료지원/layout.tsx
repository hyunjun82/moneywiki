import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세보증금반환보증 보증료, 돌려받을 수 있어요 — 청년 100% 지원 | 머니위키",
  description: "전세보증금반환보증 보증료를 국토교통부에서 돌려줘요. 청년·신혼부부 100%, 일반 90%까지 최대 40만원 환급받는 방법이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세보증금반환보증-보증료지원" },
  openGraph: {
    title: "전세보증금반환보증 보증료, 돌려받을 수 있어요 — 청년 100% 지원 | 머니위키",
    description: "전세보증금반환보증 보증료를 국토교통부에서 돌려줘요. 청년·신혼부부 100%, 일반 90%까지 최대 40만원 환급받는 방법이에요.",
    url: "https://www.jjyu.co.kr/w/전세보증금반환보증-보증료지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

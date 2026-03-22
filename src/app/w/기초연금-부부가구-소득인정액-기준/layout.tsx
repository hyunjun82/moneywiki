import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기초연금 배우자 소득도 합산될까? 부부가구 소득인정액 기준 | 머니위키",
  description: "부부가 함께 기초연금을 신청하면 소득인정액을 합산하고 선정기준도 달라져요. 부부가구 기준과 감액 구조를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-부부가구-소득인정액-기준" },
  openGraph: {
    title: "기초연금 배우자 소득도 합산될까? 부부가구 소득인정액 기준 | 머니위키",
    description: "부부가 함께 기초연금을 신청하면 소득인정액을 합산하고 선정기준도 달라져요. 부부가구 기준과 감액 구조를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-부부가구-소득인정액-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

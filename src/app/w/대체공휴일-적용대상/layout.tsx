import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대체공휴일 적용 대상 — 5인 이상 사업장 기준과 휴일수당",
  description: "대체공휴일은 5인 이상 사업장이면 법으로 보장된 유급휴일이에요. 적용되는 공휴일 8개와 휴일근로수당 150% 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대체공휴일-적용대상" },
  openGraph: {
    title: "대체공휴일 적용 대상 — 5인 이상 사업장 기준과 휴일수당 | 머니위키",
    description: "대체공휴일은 5인 이상 사업장이면 법으로 보장된 유급휴일이에요. 적용되는 공휴일 8개와 휴일근로수당 150% 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/대체공휴일-적용대상",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

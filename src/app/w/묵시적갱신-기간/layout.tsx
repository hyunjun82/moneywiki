import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "묵시적갱신 되면 기간은 몇 년? 연장 기간과 해지 조건 | 머니위키",
  description: "묵시적갱신 되면 2년 연장돼요. 횟수 제한 없이 계속 갱신 가능하고, 세입자는 3개월 전 통보로 언제든 해지할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/묵시적갱신-기간" },
  openGraph: {
    title: "묵시적갱신 되면 기간은 몇 년? 연장 기간과 해지 조건 | 머니위키",
    description: "묵시적갱신 되면 2년 연장돼요. 횟수 제한 없이 계속 갱신 가능하고, 세입자는 3개월 전 통보로 언제든 해지할 수 있어요.",
    url: "https://www.jjyu.co.kr/w/묵시적갱신-기간",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

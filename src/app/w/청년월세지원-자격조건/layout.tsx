import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년월세지원 자격조건 — 소득·자산·주거 기준 총정리",
  description: "청년월세지원 자격은 나이(만 19~34세), 중위소득 60%, 자산 1.22억, 부모와 별거·무주택 4가지예요. 원가구 소득 기준까지 상세하게 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-자격조건" },
  openGraph: {
    title: "청년월세지원 자격조건 — 소득·자산·주거 기준 총정리 | 머니위키",
    description: "청년월세지원 자격은 나이(만 19~34세), 중위소득 60%, 자산 1.22억, 부모와 별거·무주택 4가지예요. 원가구 소득 기준까지 상세하게 정리했어요.",
    url: "https://www.jjyu.co.kr/w/청년월세지원-자격조건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

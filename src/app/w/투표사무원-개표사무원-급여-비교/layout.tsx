import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "투표사무원 vs 개표사무원, 급여/시간/난이도 비교 | 머니위키",
  description: "투표사무원은 13만원에 14시간, 개표사무원은 7.5만원에 4~8시간이에요. 시급 환산과 업무 난이도를 비교해서 어떤 게 유리한지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/투표사무원-개표사무원-급여-비교" },
  openGraph: {
    title: "투표사무원 vs 개표사무원, 급여/시간/난이도 비교 | 머니위키",
    description: "투표사무원은 13만원에 14시간, 개표사무원은 7.5만원에 4~8시간이에요. 어떤 게 유리할까요?",
    url: "https://www.jjyu.co.kr/w/투표사무원-개표사무원-급여-비교",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

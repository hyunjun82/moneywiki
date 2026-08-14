import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 수급권 보호, 압류 금지 범위와 수급계좌",
  description: "빚이 있어도 실업급여는 압류 못 해요. 수급권과 수급계좌 압류 금지 범위, 이미 압류됐을 때 대처법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-수급권-보호" },
  openGraph: {
    title: "실업급여 수급권 보호, 압류 금지 범위와 수급계좌 | 머니위키",
    description: "빚이 있어도 실업급여는 압류 못 해요. 수급권과 수급계좌 압류 금지 범위, 이미 압류됐을 때 대처법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-수급권-보호",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

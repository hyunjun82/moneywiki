import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "배당소득세, 2026 분리과세 세율과 절세 방법 | 머니위키",
  description: "배당금 15.4% 원천징수, 2천만원 초과 시 종합과세. 2026년부터 상장사 배당 분리과세(20~30%) 신설. 대상 조건과 절세 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/배당소득세",
  },
  openGraph: {
    title: "배당소득세, 2026 분리과세 세율과 절세 방법",
    description: "15.4% 원천징수부터 2026 분리과세(20~30%)까지.",
    url: "https://www.jjyu.co.kr/w/배당소득세",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

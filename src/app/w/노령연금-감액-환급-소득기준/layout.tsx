import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "노령연금 감액 소득기준 — 감액률과 연기연금 활용법 | 머니위키",
  description: "소득이 A값(약 298만원)을 넘으면 노령연금이 감액돼요. 소득 구간별 감액률과 연기연금으로 더 받는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/노령연금-감액-환급-소득기준" },
  openGraph: {
    title: "노령연금 감액 소득기준 — 감액률과 연기연금",
    description: "소득 구간별 감액률과 연기연금 가산율 정리.",
    url: "https://www.jjyu.co.kr/w/노령연금-감액-환급-소득기준",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

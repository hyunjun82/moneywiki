import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "소득 하위 70%면 기초연금 무조건 받을까? 소득인정액 계산과 재산 기준 | 머니위키",
  description: "기초연금 소득 하위 70%는 실제 소득이 아니라 소득인정액 기준이에요. 계산 방법과 재산 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-소득하위70-소득인정액-재산기준" },
  openGraph: {
    title: "소득 하위 70%면 기초연금 무조건 받을까? 소득인정액 계산과 재산 기준 | 머니위키",
    description: "기초연금 소득 하위 70%는 실제 소득이 아니라 소득인정액 기준이에요. 계산 방법과 재산 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-소득하위70-소득인정액-재산기준",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

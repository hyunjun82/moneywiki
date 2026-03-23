import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 소득인정액, 어떻게 계산할까? 소득·재산 공제항목 정리 | 머니위키",
  description: "기초연금 소득인정액 계산 방법과 소득·재산별 공제항목을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-소득인정액-계산-공제항목" },
  openGraph: {
    title: "기초연금 소득인정액, 어떻게 계산할까? 소득·재산 공제항목 정리 | 머니위키",
    description: "기초연금 소득인정액 계산 방법과 소득·재산별 공제항목을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-소득인정액-계산-공제항목",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

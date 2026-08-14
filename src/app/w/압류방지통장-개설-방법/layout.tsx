import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "압류방지통장 개설 방법 — 조건·한도·서류 정리",
  description: "2026년 2월부터 전 국민 누구나 신분증 하나로 압류방지통장을 개설할 수 있어요. 월 250만원까지 보호되고 오프라인 은행 방문만 하면 돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/압류방지통장-개설-방법" },
  openGraph: {
    title: "압류방지통장 개설 방법 — 조건·한도·서류 정리 | 머니위키",
    description: "2026년 2월부터 전 국민 누구나 신분증 하나로 압류방지통장을 개설할 수 있어요. 월 250만원까지 보호되고 오프라인 은행 방문만 하면 돼요.",
    url: "https://www.jjyu.co.kr/w/압류방지통장-개설-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

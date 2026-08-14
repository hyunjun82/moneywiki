import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "2026년 기초연금 수급자격, 누가 받을 수 있을까? 선정기준액과 소득 조건",
  description: "2026년 기초연금 선정기준액은 단독 247만원, 부부 395만2천원이에요. 수급자격 조건과 소득인정액 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-수급자격-선정기준액-소득조건" },
  openGraph: {
    title: "2026년 기초연금 수급자격, 누가 받을 수 있을까? 선정기준액과 소득 조건 | 머니위키",
    description: "2026년 기초연금 선정기준액은 단독 247만원, 부부 395만2천원이에요. 수급자격 조건과 소득인정액 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-수급자격-선정기준액-소득조건",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

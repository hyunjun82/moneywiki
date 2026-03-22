import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "재택근무 시설·장비 지원, 정부 지원금 조건과 신청 방법 | 머니위키",
  description: "중소·중견기업 재택근무 시스템 구축비 50%, 최대 2천만원 지원. PC는 제외, 시스템 구축비만 대상. 신청 방법과 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재택근무-유연근무제-시설-장비-지원" },
  openGraph: {
    title: "재택근무 시설·장비 지원, 정부 지원금 조건과 신청 방법 | 머니위키",
    description: "중소·중견기업 재택근무 시스템 구축비 50%, 최대 2천만원 지원.",
    url: "https://www.jjyu.co.kr/w/재택근무-유연근무제-시설-장비-지원",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }

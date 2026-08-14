import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기초연금, 받을 수 있을까? 2026년 금액·선정기준과 신청 방법",
  description: "2026년 기초연금 선정기준액 단독 247만원, 부부 395.2만원. 기준연금액 월 34.97만원, 저소득 노인 40만원. 대상 여부 확인부터 신청까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금" },
  openGraph: {
    title: "기초연금, 받을 수 있을까? 2026년 금액·선정기준과 신청 방법 | 머니위키",
    description: "2026년 기초연금 선정기준액 단독 247만원, 부부 395.2만원. 기준연금액 월 34.97만원.",
    url: "https://www.jjyu.co.kr/w/기초연금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "유연근무제, 어떤 종류가 있을까? 유형별 차이와 신청 방법 | 머니위키",
  description: "시차출퇴근·선택근무·재택근무 등 유연근무제 5가지 유형 비교, 신청 절차, 중소기업 장려금까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/유연근무제-종류-신청-방법" },
  openGraph: {
    title: "유연근무제, 어떤 종류가 있을까? 유형별 차이와 신청 방법 | 머니위키",
    description: "시차출퇴근·선택근무·재택근무 등 유연근무제 5가지 유형 비교, 신청 절차, 중소기업 장려금까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/유연근무제-종류-신청-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

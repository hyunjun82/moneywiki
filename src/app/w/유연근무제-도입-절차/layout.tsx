import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "유연근무제, 회사에 어떻게 도입하나? 절차부터 장려금 신청까지 | 머니위키",
  description: "유연근무제 도입 4단계 절차와 장려금(월 최대 30만원, 연 360만원) 신청 방법을 정리했어요. 서면 합의, 취업규칙 변경, 출퇴근 관리까지 한 번에 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/유연근무제-도입-절차" },
  openGraph: {
    title: "유연근무제, 회사에 어떻게 도입하나? 절차부터 장려금 신청까지 | 머니위키",
    description: "유연근무제 도입 4단계 절차와 장려금(월 최대 30만원, 연 360만원) 신청 방법을 정리했어요. 서면 합의, 취업규칙 변경, 출퇴근 관리까지 한 번에 확인하세요.",
    url: "https://www.jjyu.co.kr/w/유연근무제-도입-절차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

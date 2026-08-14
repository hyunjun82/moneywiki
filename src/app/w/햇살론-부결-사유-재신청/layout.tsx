import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "햇살론 부결됐다고요? 사유별 해결법과 재신청 타이밍까지",
  description: "햇살론 부결 사유 7가지와 사유별 개선법, 재신청 최적 타이밍, 대안 서민금융 상품까지. 부결은 끝이 아니라 시작이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/햇살론-부결-사유-재신청" },
  openGraph: {
    title: "햇살론 부결됐다고요? 사유별 해결법과 재신청 타이밍까지 | 머니위키",
    description: "햇살론 부결 사유 7가지와 사유별 개선법, 재신청 최적 타이밍, 대안 서민금융 상품까지.",
    url: "https://www.jjyu.co.kr/w/햇살론-부결-사유-재신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

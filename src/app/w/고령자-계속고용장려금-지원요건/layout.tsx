import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고령자 계속고용장려금 지원요건",
  description: "정년 후 계속 고용하면 1인당 월 30~40만원, 최대 3년 지원. 지원 요건 5가지와 고용센터 분기별 신청 방법.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고령자-계속고용장려금-지원요건" },
  openGraph: {
    title: "고령자 계속고용장려금 지원요건",
    description: "1인당 월 30~40만원 최대 3년. 지원 요건과 신청 절차 정리.",
    url: "https://www.jjyu.co.kr/w/고령자-계속고용장려금-지원요건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

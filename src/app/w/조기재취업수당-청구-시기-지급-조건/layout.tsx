import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "조기재취업수당, 남은 실업급여 절반 받는 방법 | 머니위키",
  description: "실업급여 받다가 취업하면 잔여일수의 50%를 한 번에 받을 수 있어요. 12개월 근속 후 고용24에서 청구. 월 574만원 미만 조건.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/조기재취업수당-청구-시기-지급-조건",
  },
  openGraph: {
    title: "조기재취업수당, 남은 실업급여 절반 받는 방법",
    description: "잔여일수 50% x 구직급여일액. 12개월 근속 후 청구 가능.",
    url: "https://www.jjyu.co.kr/w/조기재취업수당-청구-시기-지급-조건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

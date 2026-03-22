import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "국민연금 유족연금 조건 | 머니위키",
  description: "국민연금 가입자가 사망하면 유족연금 받을 수 있나요? 지급 대상과 금액 정리했어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민연금-유족연금-조건" },
  openGraph: {
    title: "국민연금 유족연금 조건",
    description: "국민연금 가입자가 사망하면 유족연금 받을 수 있나요? 지급 대상과 금액 정리했어요",
    url: "https://www.jjyu.co.kr/w/국민연금-유족연금-조건",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

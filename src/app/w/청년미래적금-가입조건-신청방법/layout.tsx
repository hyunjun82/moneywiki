import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년미래적금, 나도 가입할 수 있을까? 자격 조건부터 신청 방법까지 | 머니위키",
  description: "3년 만기 최대 2,200만원. 정부기여금 6~12%에 이자소득 비과세까지. 청년미래적금 가입 조건과 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년미래적금-가입조건-신청방법" },
  openGraph: {
    title: "청년미래적금, 나도 가입할 수 있을까? 자격 조건부터 신청 방법까지 | 머니위키",
    description: "3년 만기 최대 2,200만원. 정부기여금 6~12%에 이자소득 비과세까지. 청년미래적금 가입 조건과 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/청년미래적금-가입조건-신청방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

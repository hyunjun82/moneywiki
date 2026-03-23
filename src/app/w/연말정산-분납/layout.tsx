import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 분납 — 추가 납부 세액 나눠 내는 방법 | 머니위키",
  description: "연말정산 추가 납부 세액이 10만원을 넘으면 2월~4월 3개월간 분할 납부할 수 있어요. 이자 없이 나눠 내는 조건과 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-분납" },
  openGraph: {
    title: "연말정산 분납 — 추가 납부 세액 나눠 내는 방법",
    description: "10만원 초과 시 3개월 무이자 분할 납부 가능. 신청 방법 정리.",
    url: "https://www.jjyu.co.kr/w/연말정산-분납",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

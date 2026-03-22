import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "공무원 연말정산 — 공무원연금 기여금 공제와 절차 | 머니위키",
  description: "공무원도 일반 직장인과 동일하게 연말정산해요. 국민연금 대신 공무원연금 기여금 전액 소득공제, 나머지 공제항목은 100% 동일해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-공무원",
  },
  openGraph: {
    title: "공무원 연말정산 — 공무원연금 기여금 공제와 절차",
    description: "공무원연금 기여금 전액 소득공제, 나머지 공제는 일반 직장인과 동일. 체크리스트와 FAQ까지 정리.",
    url: "https://www.jjyu.co.kr/w/연말정산-공무원",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

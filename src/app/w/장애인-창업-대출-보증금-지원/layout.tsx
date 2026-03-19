import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "장애인 창업 대출 보증금 지원 최대 1억원 | 머니위키",
  description: "장애인자립자금대여 점포보증금 7천만원·운영자금 3천만원 연2~3%. 고용공단 창업지원금 최대 1억원 상환 없음. 신청 방법 안내.",
  openGraph: {
    title: "장애인 창업 대출 보증금 지원 최대 1억원",
    description: "무보증 저금리 대출 + 상환 없는 지원금으로 창업 자금 마련하기.",
    url: "https://jjyu.co.kr/w/장애인-창업-대출-보증금-지원",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/장애인-창업-대출-보증금-지원",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

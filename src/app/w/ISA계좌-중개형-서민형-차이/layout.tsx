import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ISA 계좌 중개형 vs 신탁형, 서민형 vs 일반형 차이와 선택법 | 머니위키",
  description: "ISA 중개형은 주식 직접거래, 신탁형은 은행 위임이에요. 서민형은 비과세 400만원, 일반형은 200만원이고 대부분 중개형+서민형 조합이 유리해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/ISA계좌-중개형-서민형-차이",
  },
  openGraph: {
    title: "ISA 계좌 중개형 vs 신탁형, 서민형 vs 일반형 차이와 선택법",
    description: "중개형은 직접거래, 신탁형은 은행위임. 서민형 비과세 400만원 vs 일반형 200만원.",
    url: "https://www.jjyu.co.kr/w/ISA계좌-중개형-서민형-차이",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

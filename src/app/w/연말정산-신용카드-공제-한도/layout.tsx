import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "카드 많이 써도 환급이 적은 이유? 신용카드 공제 한도와 계산법",
  description: "총급여 25% 초과분부터 공제 시작. 신용카드 15%, 체크카드 30%, 전통시장 40%. 기본 한도 300만원 + 추가 300만원까지.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-신용카드-공제-한도",
  },
  openGraph: {
    title: "신용카드 공제 한도와 계산법",
    description: "25% 초과분부터 시작. 카드별 공제율과 절세 전략.",
    url: "https://www.jjyu.co.kr/w/연말정산-신용카드-공제-한도",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

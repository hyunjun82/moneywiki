import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "MMF 투자 수익률과 가입 방법 — 예금과 차이 비교",
  description: "MMF는 단기 금융상품에 투자하는 펀드로 연 2.5~2.8% 수익률을 보여요. 증권사 앱에서 1만원부터 시작 가능하고 1영업일 환매돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/MMF투자-수익률-방법",
  },
  openGraph: {
    title: "MMF 투자 수익률과 가입 방법 — 예금과 차이 비교",
    description: "MMF 수익 구조, 가입 절차, 은행 예금과 비교까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/MMF투자-수익률-방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

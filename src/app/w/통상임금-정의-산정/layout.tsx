import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "통상임금 정의와 산정: 법적 기준 및 계산 방법 | 머니위키",
  description: "월급 받는데 통상임금이 뭔지 몰라서 야간수당 못 받는다는 거 아시나요? 통상임금 정의와 계산 방법, 2024년 판례 변경사항까지 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/통상임금-정의-산정" },
  openGraph: { title: "통상임금 정의와 산정: 법적 기준 및 계산 방법 | 머니위키", description: "월급 받는데 통상임금이 뭔지 몰라서 야간수당 못 받는다는 거 아시나요? 통상임금 정의와 계산 방법, 2024년 판례 변경사항까지 알려드려요", url: "https://www.jjyu.co.kr/w/통상임금-정의-산정", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

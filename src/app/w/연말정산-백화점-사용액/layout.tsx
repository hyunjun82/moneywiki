import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "백화점 사용액 연말정산 공제율 15%와 절세 전략",
  description: "백화점 신용카드 사용액은 15% 공제율, 체크카드 30%, 전통시장 40%예요. 결제 수단별 공제율 비교와 절세 전략을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-백화점-사용액" },
  openGraph: {
    title: "백화점 사용액 연말정산 공제율 15%와 절세 전략 | 머니위키",
    description: "백화점 신용카드 사용액은 15% 공제율, 체크카드 30%, 전통시장 40%예요. 결제 수단별 공제율 비교와 절세 전략을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-백화점-사용액",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

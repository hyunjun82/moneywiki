import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "체크카드 공제율 30%, 신용카드보다 정말 유리할까? 전환 전략 정리",
  description: "체크카드 공제율은 30%로 신용카드(15%)의 2배예요. 총급여 25% 초과분부터 체크카드로 전환하면 같은 금액으로 공제를 2배로 받을 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-체크카드-공제율",
  },
  openGraph: {
    title: "체크카드 공제율 30%, 신용카드 전환 시점은?",
    description: "총급여 25% 넘긴 뒤 체크카드 전환 전략. 공제율 비교와 계산 예시.",
    url: "https://www.jjyu.co.kr/w/연말정산-체크카드-공제율",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

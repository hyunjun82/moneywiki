import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경차 타면 기름값 돌려받을 수 있다고? 유류세 환급 조건과 카드 신청법",
  description: "경형자동차 소유자는 경차사랑카드로 주유하면 리터당 250원, 연간 최대 30만원 유류세를 돌려받아요. 대상 조건, 카드 신청 방법, 주의사항까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/경형자동차-유류세-환급-조건",
  },
  openGraph: {
    title: "경차 타면 기름값 돌려받을 수 있다고? 유류세 환급 조건과 카드 신청법",
    description: "리터당 250원, 연 30만원 환급. 경차사랑카드 신청법과 대상 조건.",
    url: "https://www.jjyu.co.kr/w/경형자동차-유류세-환급-조건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "법인지방소득세 분할납부 조건·기한·신청방법 | 100만원 초과 | 머니위키",
  description:
    "납부세액이 100만원을 넘으면 분할납부할 수 있습니다. 일반 법인 1개월·중소기업 2개월 이내 기한과 금액 구간별 분할 한도, 위택스 신청 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/법인지방소득세-분할납부" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

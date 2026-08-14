import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "원천세 늦게 내면 가산세가 얼마나 붙을까? 계산 방법과 감면 조건",
  description: "원천세 가산세는 미납세액의 3%에 하루 0.022%씩 누적돼요. 6개월 이내 수정신고하면 50% 감면받을 수 있어요. 계산 방법과 감면 조건을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/원천세-가산세-계산",
  },
  openGraph: {
    title: "원천세 가산세 계산 방법과 감면 조건",
    description: "미납세액 3% + 일할 0.022%. 수정신고 감면율까지 정리.",
    url: "https://www.jjyu.co.kr/w/원천세-가산세-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "결산법인 교육세, 2·5·8월 중간예납 일정과 납부 방법 | 머니위키",
  description: "금융·보험업 결산법인은 교육세를 2월·5월·8월 3회 중간예납해요. 세율은 수익금액의 0.5%이고, 기한 넘기면 하루당 0.022% 가산세가 붙어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/결산법인-교육세-중간예납",
  },
  openGraph: {
    title: "결산법인 교육세 중간예납 일정과 납부 방법",
    description: "금융보험업 법인 대상, 2·5·8월 분할 납부. 세율 0.5%, 기한 엄수.",
    url: "https://www.jjyu.co.kr/w/결산법인-교육세-중간예납",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

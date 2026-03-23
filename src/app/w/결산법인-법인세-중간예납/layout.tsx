import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "결산법인 법인세 중간예납, 언제까지 얼마나 내야 하나? 기한과 계산법 | 머니위키",
  description: "12월 결산법인은 8월 31일까지 법인세 중간예납을 신고·납부해야 해요. 직전 사업연도 세액의 절반을 내고, 50만원 미만이면 면제돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/결산법인-법인세-중간예납" },
  openGraph: {
    title: "결산법인 법인세 중간예납, 언제까지 얼마나 내야 하나? 기한과 계산법 | 머니위키",
    description: "12월 결산법인은 8월 31일까지 법인세 중간예납을 신고·납부해야 해요. 직전 사업연도 세액의 절반을 내고, 50만원 미만이면 면제돼요.",
    url: "https://www.jjyu.co.kr/w/결산법인-법인세-중간예납",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

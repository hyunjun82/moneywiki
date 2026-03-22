import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주민세, 나는 얼마를 내야 할까? 종류별 세액과 납부 방법 | 머니위키",
  description: "개인 균등분 1만원 이하, 사업소분은 면적 기준, 종업원분은 급여총액 0.5%. 주민세 종류별 세액과 위택스 납부 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주민세" },
  openGraph: {
    title: "주민세, 나는 얼마를 내야 할까? 종류별 세액과 납부 방법 | 머니위키",
    description: "개인 균등분 1만원 이하, 사업소분은 면적 기준, 종업원분은 급여총액 0.5%. 주민세 종류별 세액과 위택스 납부 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/주민세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

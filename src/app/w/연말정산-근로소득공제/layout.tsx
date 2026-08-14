import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근로소득공제, 내 급여에서 얼마나 빠질까? 구간별 공제율과 계산법",
  description: "근로소득공제는 총급여에서 자동으로 빼주는 기본 공제예요. 500만원 이하 70%에서 1억원 초과 2%까지 5개 구간으로 나뉘어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-근로소득공제" },
  openGraph: {
    title: "근로소득공제, 내 급여에서 얼마나 빠질까? 구간별 공제율과 계산법 | 머니위키",
    description: "근로소득공제는 총급여에서 자동으로 빼주는 기본 공제예요. 500만원 이하 70%에서 1억원 초과 2%까지 5개 구간으로 나뉘어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-근로소득공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

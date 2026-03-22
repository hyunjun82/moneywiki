import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "출산휴가·육아휴직 분할 사용 — 횟수·급여·신청 방법 | 머니위키",
  description: "2025년부터 육아휴직 최대 4회 분할, 기간 1년 6개월로 연장됐어요. 출산휴가 분할 여부, 6+6 부모육아휴직제 급여, 신청 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/출산휴가-육아휴직-분할" },
  openGraph: {
    title: "출산휴가·육아휴직 분할 사용 — 횟수·급여·신청 방법 | 머니위키",
    description: "2025년부터 육아휴직 최대 4회 분할, 기간 1년 6개월로 연장됐어요. 출산휴가 분할 여부, 6+6 부모육아휴직제 급여, 신청 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/출산휴가-육아휴직-분할",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

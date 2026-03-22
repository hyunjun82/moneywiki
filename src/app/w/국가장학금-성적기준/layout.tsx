import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국가장학금 성적기준 B학점 80점 | 머니위키",
  description: "국가장학금 직전 학기 12학점 이수, B학점 80점 이상. 신입생 면제, 기초·차상위 C학점 70점 완화, C학점 경고제 활용법.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국가장학금-성적기준" },
  openGraph: {
    title: "국가장학금 성적기준 B학점 80점",
    description: "12학점 이수 + B학점 80점. 면제 대상과 구제 방법 정리.",
    url: "https://www.jjyu.co.kr/w/국가장학금-성적기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

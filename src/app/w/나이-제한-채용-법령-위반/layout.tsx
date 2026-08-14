import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "나이 제한 채용 법령 위반 기준",
  description: "채용 공고 나이 제한은 연령차별금지법 위반, 500만원 이하 벌금. 직접·간접 차별 사례와 신고 방법.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/나이-제한-채용-법령-위반" },
  openGraph: {
    title: "나이 제한 채용 법령 위반 기준",
    description: "연령차별 금지 기준 + 신고 방법 + 처벌 수위 정리.",
    url: "https://www.jjyu.co.kr/w/나이-제한-채용-법령-위반",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

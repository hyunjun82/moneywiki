import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지급 기한 연장 동의서, 써도 괜찮을까? | 머니위키",
  description: "퇴직금 기한 연장 동의서를 쓰면 지연이자 청구가 제한돼요. 동의서에 꼭 들어가야 할 내용과 작성 전 주의사항을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지급-기한-연장-동의서" },
  openGraph: {
    title: "퇴직금 지급 기한 연장 동의서, 써도 괜찮을까? | 머니위키",
    description: "퇴직금 기한 연장 동의서를 쓰면 지연이자 청구가 제한돼요. 동의서에 꼭 들어가야 할 내용과 작성 전 주의사항을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지급-기한-연장-동의서",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

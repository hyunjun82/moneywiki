import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지급 기한 연장 동의서, 서명해도 되나요? | 머니위키",
  description: "연장 동의서에 이자 포기 조항이 있으면 서명하는 순간 지연이자 청구권을 잃어요. 독소 조항 파악법부터 서명 거부 시 대응까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지급-기한-연장-동의서" },
  openGraph: {
    title: "퇴직금 지급 기한 연장 동의서, 서명해도 되나요? | 머니위키",
    description: "연장 동의서에 이자 포기 조항이 있으면 서명하는 순간 지연이자 청구권을 잃어요. 독소 조항 파악법부터 서명 거부 시 대응까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지급-기한-연장-동의서",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

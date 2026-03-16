import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임원 퇴직금 지급 기한, 일반 직원과 같은가요? | 머니위키",
  description: "임원 퇴직금 지급 기한은 근로자 여부에 따라 달라져요. 14일 원칙 적용 여부, 지연 시 대응법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임원퇴직금-지급-기한" },
  openGraph: {
    title: "임원 퇴직금 지급 기한, 일반 직원과 같은가요? | 머니위키",
    description: "임원 퇴직금 지급 기한은 근로자 여부에 따라 달라져요. 14일 원칙 적용 여부, 지연 시 대응법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/임원퇴직금-지급-기한",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

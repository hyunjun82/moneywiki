import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 적립금 조회, 금융기관 앱과 통합연금포털 방법 | 머니위키",
  description: "퇴직연금 적립금을 금융기관 앱이나 통합연금포털에서 조회하는 방법을 정리했어요. DB형과 DC형 조회 차이, 적립금 적을 때 점검 사항도 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-적립금-조회" },
  openGraph: {
    title: "퇴직연금 적립금 조회, 금융기관 앱과 통합연금포털 방법 | 머니위키",
    description: "퇴직연금 적립금 조회 방법과 DB vs DC 차이를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-적립금-조회",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

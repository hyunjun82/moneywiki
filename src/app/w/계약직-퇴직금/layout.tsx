import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약직 퇴직금, 1년 채우면 받을 수 있나요?",
  description: "계약직도 1년 이상 근무하고 주 15시간 이상 일했다면 퇴직금을 받을 수 있어요. 계약 갱신 시 기간 합산 여부와 청구 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약직-퇴직금" },
  openGraph: {
    title: "계약직 퇴직금, 1년 채우면 받을 수 있나요? | 머니위키",
    description: "계약직도 1년 이상 근무하고 주 15시간 이상 일했다면 퇴직금을 받을 수 있어요. 계약 갱신 시 기간 합산 여부와 청구 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/계약직-퇴직금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

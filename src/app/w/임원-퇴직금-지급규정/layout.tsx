import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임원 퇴직금 지급 규정, 일반 직원이랑 다른가요?",
  description: "임원 퇴직금은 정관이나 주주총회 결의로 정해져요. 일반 직원과 다른 규정, 계산법, 세금 처리를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임원-퇴직금-지급규정" },
  openGraph: {
    title: "임원 퇴직금 지급 규정, 일반 직원이랑 다른가요? | 머니위키",
    description: "임원 퇴직금은 정관이나 주주총회 결의로 정해져요. 일반 직원과 다른 규정, 계산법, 세금 처리를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/임원-퇴직금-지급규정",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

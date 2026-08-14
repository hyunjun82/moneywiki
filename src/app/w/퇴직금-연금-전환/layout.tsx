import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 연금 전환, 일시금보다 유리한가요?",
  description: "퇴직금을 연금으로 전환하면 세금이 30~40% 줄어들 수 있어요. 전환 방법, 수령 기간, 일시금과의 비교를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-연금-전환" },
  openGraph: {
    title: "퇴직금 연금 전환, 일시금보다 유리한가요? | 머니위키",
    description: "퇴직금을 연금으로 전환하면 세금이 30~40% 줄어들 수 있어요. 전환 방법, 수령 기간, 일시금과의 비교를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-연금-전환",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

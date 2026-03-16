import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 일시금으로 받으면 세금이 더 많나요? | 머니위키",
  description: "퇴직금을 일시금으로 받으면 퇴직소득세 100%를 내야 해요. 연금 수령 시 30~40% 절감과 비교하고, 일시금 절세법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-일시금-세금" },
  openGraph: {
    title: "퇴직금 일시금으로 받으면 세금이 더 많나요? | 머니위키",
    description: "퇴직금을 일시금으로 받으면 퇴직소득세 100%를 내야 해요. 연금 수령 시 30~40% 절감과 비교하고, 일시금 절세법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-일시금-세금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

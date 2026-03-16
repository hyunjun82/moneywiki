import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 중간정산 주택 구입, 조건과 절차는? | 머니위키",
  description: "무주택자가 주택을 구입하거나 전세 보증금을 마련할 때 퇴직금 중간정산이 가능해요. 무주택 기준, 필요 서류, 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중간정산-주택구입" },
  openGraph: {
    title: "퇴직금 중간정산 주택 구입, 조건과 절차는? | 머니위키",
    description: "무주택자가 주택을 구입하거나 전세 보증금을 마련할 때 퇴직금 중간정산이 가능해요. 무주택 기준, 필요 서류, 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중간정산-주택구입",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

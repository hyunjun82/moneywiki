import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임신 중 퇴직하면 실업급여? 수급기간 연장 조건과 신청 방법 | 머니위키",
  description: "임신 중이어도 실업급여를 받을 수 있죠. 구직활동이 어려우면 수급기간 연장을 신청하세요. 최대 4년까지 연장되고, 출산 후 구직활동하면서 받으면 돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-임신" },
  openGraph: {
    title: "임신 중 퇴직하면 실업급여? 수급기간 연장 조건과 신청 방법 | 머니위키",
    description: "임신 중이어도 실업급여를 받을 수 있죠. 구직활동이 어려우면 수급기간 연장을 신청하세요. 최대 4년까지 연장되고, 출산 후 구직활동하면서 받으면 돼요.",
    url: "https://www.jjyu.co.kr/w/실업급여-임신",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

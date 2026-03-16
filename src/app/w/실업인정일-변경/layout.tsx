import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업인정일 못 갈 때 어떡해? 변경 사유와 신청 절차 | 머니위키",
  description: "실업인정일에 출석이 어려우면 사전에 변경 신청할 수 있어요. 정당한 변경 사유, 고용24 온라인 신청 방법, 불참 시 불이익까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업인정일-변경" },
  openGraph: {
    title: "실업인정일 못 갈 때 어떡해? 변경 사유와 신청 절차 | 머니위키",
    description: "실업인정일에 출석이 어려우면 사전에 변경 신청할 수 있어요. 정당한 변경 사유, 고용24 온라인 신청 방법, 불참 시 불이익까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업인정일-변경",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

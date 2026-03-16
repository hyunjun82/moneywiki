import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 정산 방법 | 포함 항목·서류·이의제기까지 정리 | 머니위키",
  description: "퇴직금 정산은 평균임금 x 근속일수 / 365로 계산해요. 정산 시 포함 항목, 금액이 적은 이유, 이의제기 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-정산" },
  openGraph: {
    title: "퇴직금 정산 방법 | 포함 항목·서류·이의제기까지 정리 | 머니위키",
    description: "퇴직금 정산은 평균임금 x 근속일수 / 365로 계산해요. 정산 시 포함 항목, 금액이 적은 이유, 이의제기 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-정산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

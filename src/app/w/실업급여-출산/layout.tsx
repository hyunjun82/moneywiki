import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "출산 후 실업급여, 언제 신청해? 수급기간 연장 기준",
  description: "출산 후에도 실업급여를 받을 수 있어요. 수급기간 연장으로 최대 4년까지 여유 있게 신청할 수 있고, 출산전후휴가 급여와는 중복 수급이 안 돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-출산" },
  openGraph: {
    title: "출산 후 실업급여, 언제 신청해? 수급기간 연장 기준 | 머니위키",
    description: "출산 후에도 실업급여를 받을 수 있어요. 수급기간 연장으로 최대 4년까지 여유 있게 신청할 수 있고, 출산전후휴가 급여와는 중복 수급이 안 돼요.",
    url: "https://www.jjyu.co.kr/w/실업급여-출산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

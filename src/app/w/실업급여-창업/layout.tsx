import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 받으면서 창업하면? 사업자등록과 수급 조건 | 머니위키",
  description: "실업급여 수급 중 사업자등록을 하면 그날부터 수급이 중단돼요. 소정급여일수 절반 이상 남기고 창업하면 조기재취업수당을 받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-창업" },
  openGraph: {
    title: "실업급여 받으면서 창업하면? 사업자등록과 수급 조건 | 머니위키",
    description: "실업급여 수급 중 사업자등록을 하면 그날부터 수급이 중단돼요. 소정급여일수 절반 이상 남기고 창업하면 조기재취업수당을 받을 수 있어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-창업",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

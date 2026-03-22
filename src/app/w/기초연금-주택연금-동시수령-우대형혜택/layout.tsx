import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주택연금 받으면서 기초연금도 될까? 동시 수령과 우대형 혜택 | 머니위키",
  description: "주택연금과 기초연금은 동시에 받을 수 있고, 기초연금 수급자는 우대형 주택연금으로 더 많이 받을 수 있어요. 조건과 혜택을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-주택연금-동시수령-우대형혜택" },
  openGraph: {
    title: "주택연금 받으면서 기초연금도 될까? 동시 수령과 우대형 혜택 | 머니위키",
    description: "주택연금과 기초연금은 동시에 받을 수 있고, 기초연금 수급자는 우대형 주택연금으로 더 많이 받을 수 있어요. 조건과 혜택을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-주택연금-동시수령-우대형혜택",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

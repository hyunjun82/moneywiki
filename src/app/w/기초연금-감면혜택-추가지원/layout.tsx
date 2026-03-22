import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기초연금 받으면 또 뭘 받을 수 있을까? 감면 혜택과 추가 지원 | 머니위키",
  description: "기초연금 수급자는 건강보험료 감면, 통신비 할인, 난방비 지원 등 추가 혜택을 받을 수 있어요. 놓치기 쉬운 감면 혜택을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-감면혜택-추가지원" },
  openGraph: {
    title: "기초연금 받으면 또 뭘 받을 수 있을까? 감면 혜택과 추가 지원 | 머니위키",
    description: "기초연금 수급자는 건강보험료 감면, 통신비 할인, 난방비 지원 등 추가 혜택을 받을 수 있어요. 놓치기 쉬운 감면 혜택을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-감면혜택-추가지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

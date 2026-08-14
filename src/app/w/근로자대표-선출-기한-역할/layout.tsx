import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "근로자대표 선출·기한·역할 완벽 가이드",
  description: "근로자대표가 뭐 하는 사람인지, 어떻게 선출되고 몇 년 하는지 알려드릴게요. 직장에서 필수로 알아둬야 할 내용이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로자대표-선출-기한-역할" },
  openGraph: {
    title: "근로자대표 선출·기한·역할 완벽 가이드",
    description: "근로자대표가 뭐 하는 사람인지, 어떻게 선출되고 몇 년 하는지 알려드릴게요. 직장에서 필수로 알아둬야 할 내용이에요.",
    url: "https://www.jjyu.co.kr/w/근로자대표-선출-기한-역할",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

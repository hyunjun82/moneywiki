import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "파업 참여·임금 상실·해고 기준 알아보기 | 머니위키",
  description: "파업에 참여하면 임금을 못 받아요. 하지만 조건이 있어요. 해고될 수 있는 경우와 보호받는 경우를 구분해서 설명해드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/파업-참여-임금-상실-해고-기준" },
  openGraph: { title: "파업 참여·임금 상실·해고 기준 알아보기", description: "파업에 참여하면 임금을 못 받아요. 하지만 조건이 있어요. 해고될 수 있는 경우와 보호받는 경우를 구분해서 설명해드릴게요.", url: "https://www.jjyu.co.kr/w/파업-참여-임금-상실-해고-기준", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

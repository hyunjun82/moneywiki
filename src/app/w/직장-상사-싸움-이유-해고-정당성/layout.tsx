import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "상사와 싸웠다는 이유로 해고당할 수 있나요? 해고 정당성 판단 기준 | 머니위키",
  description: "단순 말다툼만으로는 해고 정당성이 인정되기 어려워요. 폭행이 있었다면 달라질 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/직장-상사-싸움-이유-해고-정당성" },
  openGraph: { title: "상사와 싸웠다는 이유로 해고당할 수 있나요? 해고 정당성 판단 기준 | 머니위키", description: "단순 말다툼만으로는 해고 정당성이 인정되기 어려워요. 폭행이 있었다면 달라질 수 있어요.", url: "https://www.jjyu.co.kr/w/직장-상사-싸움-이유-해고-정당성", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

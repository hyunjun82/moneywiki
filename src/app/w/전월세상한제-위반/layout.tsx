import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전월세상한제 위반 | 머니위키",
  description: "집주인이 5% 넘게 올렸으면 초과분은 무효예요. 이미 냈어도 돌려받을 수 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전월세상한제-위반" },
  openGraph: {
    title: "전월세상한제 위반",
    description: "집주인이 5% 넘게 올렸으면 초과분은 무효예요. 이미 냈어도 돌려받을 수 있어요",
    url: "https://www.jjyu.co.kr/w/전월세상한제-위반",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

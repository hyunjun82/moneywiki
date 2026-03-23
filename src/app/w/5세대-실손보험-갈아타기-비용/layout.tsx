import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "5세대 실손보험 갈아타기: 비용 및 절감액 | 머니위키",
  description: "5세대 실손보험으로 갈아타면 비용이 얼마나 들까요? 전환 수수료는 없고 보험료는 30-50% 줄어들지만, 비급여 자기부담금은 늘어나요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/5세대-실손보험-갈아타기-비용" },
  openGraph: {
    title: "5세대 실손보험 갈아타기: 비용 및 절감액",
    description: "5세대 실손보험으로 갈아타면 비용이 얼마나 들까요? 전환 수수료는 없고 보험료는 30-50% 줄어들지만, 비급여 자기부담금은 늘어나요",
    url: "https://www.jjyu.co.kr/w/5세대-실손보험-갈아타기-비용",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "장기전세임대주택 입주자 선정 기준 | 머니위키",
  description: "무주택자면서 소득과 자산 기준 충족해야 해요. 동일순위는 가점 높은 순서로 선정돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장기전세임대주택-입주자선정" },
  openGraph: {
    title: "장기전세임대주택 입주자 선정 기준",
    description: "무주택자면서 소득과 자산 기준 충족해야 해요. 동일순위는 가점 높은 순서로 선정돼요.",
    url: "https://www.jjyu.co.kr/w/장기전세임대주택-입주자선정",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전월세신고 과태료 — 미신고 금액 기준과 감경 방법 | 머니위키",
  description: "전월세 미신고 시 4만~100만원 과태료가 부과돼요. 자진신고하면 50% 감경. 신고 대상 기준과 과태료 금액을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전월세신고-과태료" },
  openGraph: { title: "전월세신고 과태료 — 미신고 금액 기준과 감경 방법", description: "과태료 금액표와 감경 방법 정리.", url: "https://www.jjyu.co.kr/w/전월세신고-과태료", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

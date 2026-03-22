import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재산분할 혼인신고 전 재산 포함: 혼전 재산 포함 여부 기준 | 머니위키",
  description: "혼인신고 전에 갖고 있던 재산도 재산분할 대상이 되는지 알려드려요. 원칙은 제외지만 혼인기간이 길면 포함될 수 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재산분할-혼인신고-전-재산-포함" },
  openGraph: { title: "재산분할 혼인신고 전 재산 포함: 혼전 재산 포함 여부 기준", description: "혼인신고 전에 갖고 있던 재산도 재산분할 대상이 되는지 알려드려요. 원칙은 제외지만 혼인기간이 길면 포함될 수 있어요", url: "https://www.jjyu.co.kr/w/재산분할-혼인신고-전-재산-포함", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

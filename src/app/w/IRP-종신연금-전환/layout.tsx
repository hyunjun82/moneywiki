import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "IRP를 종신연금으로 전환하려면? 생명보험사 이전 절차와 세금 비교 | 머니위키",
  description: "IRP를 생명보험사로 이전하면 종신연금으로 전환할 수 있어요. 확정기간형 5.5%보다 낮은 3.3~4.4% 세율로 절세 가능하고, 이전은 해지가 아니라 세제혜택이 유지돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/IRP-종신연금-전환",
  },
  openGraph: {
    title: "IRP를 종신연금으로 전환하려면? 생명보험사 이전 절차와 세금 비교",
    description: "생명보험사 이전으로 종신연금 전환, 3.3~5.5% 저율과세 적용.",
    url: "https://www.jjyu.co.kr/w/IRP-종신연금-전환",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

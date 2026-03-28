import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 재산분할로 집을 받으면 | 취득세를 내야 하나요",
  description: "이혼 재산분할로 집을 받으면 | 취득세를 내야 하나요 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/이혼-재산분할-집-취득세",
  },
  openGraph: {
    title: "이혼 재산분할로 집을 받으면 | 취득세를 내야 하나요",
    description: "이혼 재산분할로 집을 받으면 | 취득세를 내야 하나요 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/이혼-재산분할-집-취득세",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

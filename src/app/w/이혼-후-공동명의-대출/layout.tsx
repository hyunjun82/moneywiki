import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 후 공동명의 대출은 | 누가 갚아야 하나요",
  description: "이혼 후 공동명의 대출은 | 누가 갚아야 하나요 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/이혼-후-공동명의-대출",
  },
  openGraph: {
    title: "이혼 후 공동명의 대출은 | 누가 갚아야 하나요",
    description: "이혼 후 공동명의 대출은 | 누가 갚아야 하나요 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/이혼-후-공동명의-대출",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

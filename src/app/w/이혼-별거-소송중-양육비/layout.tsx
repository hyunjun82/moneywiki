import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 별거 중·소송 중 양육비 | 이혼 전에 받을 수 있는 임시 양육비",
  description: "이혼 별거 중·소송 중 양육비 | 이혼 전에 받을 수 있는 임시 양육비 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/이혼-별거-소송중-양육비",
  },
  openGraph: {
    title: "이혼 별거 중·소송 중 양육비 | 이혼 전에 받을 수 있는 임시 양육비",
    description: "이혼 별거 중·소송 중 양육비 | 이혼 전에 받을 수 있는 임시 양육비 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/이혼-별거-소송중-양육비",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

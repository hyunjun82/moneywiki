import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼할 때 시부모 증여 토지도 | 재산분할이 되나요",
  description: "이혼할 때 시부모 증여 토지도 | 재산분할이 되나요 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/이혼-시부모-증여-토지-재산분할",
  },
  openGraph: {
    title: "이혼할 때 시부모 증여 토지도 | 재산분할이 되나요",
    description: "이혼할 때 시부모 증여 토지도 | 재산분할이 되나요 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/이혼-시부모-증여-토지-재산분할",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

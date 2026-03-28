import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 일방 거부·별거 이혼 사유 | 상대방이 거부해도 이혼하는 방법",
  description: "이혼 일방 거부·별거 이혼 사유 | 상대방이 거부해도 이혼하는 방법 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/이혼-일방-거부",
  },
  openGraph: {
    title: "이혼 일방 거부·별거 이혼 사유 | 상대방이 거부해도 이혼하는 방법",
    description: "이혼 일방 거부·별거 이혼 사유 | 상대방이 거부해도 이혼하는 방법 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/이혼-일방-거부",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

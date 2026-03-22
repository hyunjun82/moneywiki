import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직 후 회사 비밀 누설하면? 처벌 기준과 손해배상 범위",
  description: "영업비밀 침해 시 10년 이하 징역, 5억원 이하 벌금이에요. 퇴직 후에도 비밀유지 의무는 계속되고, 징벌적 손해배상 최대 5배까지 가능해요.",
  openGraph: {
    title: "퇴직 후 회사 비밀 누설하면? 처벌 기준과 손해배상 범위",
    description: "영업비밀 침해 시 10년 이하 징역, 5억원 이하 벌금이에요. 퇴직 후에도 비밀유지 의무는 계속되고, 징벌적 손해배상 최대 5배까지 가능해요.",
    type: "article",
  },
  alternates: { canonical: "/w/비밀유지-의무-위반" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

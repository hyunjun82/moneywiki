import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "다운계약서 쓰면 비과세 못 받아요 — 양도세 가산세와 과태료까지",
  description: "1세대1주택 비과세 요건 충족해도 다운계약서 작성하면 비과세 배제돼요. 가산세 최대 40%, 과태료 취득가액 10%까지 부과돼요.",
  openGraph: {
    title: "다운계약서 쓰면 비과세 못 받아요 — 양도세 가산세와 과태료까지",
    description: "1세대1주택 비과세 요건 충족해도 다운계약서 작성하면 비과세 배제돼요. 가산세 최대 40%, 과태료 취득가액 10%까지 부과돼요.",
    type: "article",
  },
  alternates: { canonical: "/w/다운계약서-양도세" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

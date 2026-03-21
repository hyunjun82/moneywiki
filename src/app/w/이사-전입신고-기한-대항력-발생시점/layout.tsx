import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이사 후 전입신고 기한과 대항력 잔금 당일 해야 하는 이유",
  description: "이사 후 전입신고는 14일 이내지만, 보증금 보호를 위해 잔금 당일 해야 해요. 대항력은 다음 날 0시에 생기고, 확정일자까지 받아야 경매 때 보증금을 지킬 수 있어요.",
  alternates: {
    canonical: "/w/이사-전입신고-기한-대항력-발생시점",
  },
  openGraph: {
    title: "이사 후 전입신고 기한과 대항력 잔금 당일 해야 하는 이유",
    description: "이사 후 전입신고는 14일 이내지만, 보증금 보호를 위해 잔금 당일 해야 해요. 대항력은 다음 날 0시에 생기고, 확정일자까지 받아야 경매 때 보증금을 지킬 수 있어요.",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

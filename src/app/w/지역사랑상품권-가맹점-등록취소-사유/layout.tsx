import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "지역사랑상품권 가맹점, 이러면 취소돼요 — 등록취소 사유와 대응법",
  description: "상품권 현금 환전, 결제 거부, 부정 등록 시 가맹점 등록이 취소돼요. 지역사랑상품권법 기준 취소 사유 4가지와 대응법을 안내해요.",
  openGraph: {
    title: "지역사랑상품권 가맹점, 이러면 취소돼요 — 등록취소 사유와 대응법",
    description: "상품권 현금 환전, 결제 거부, 부정 등록 시 가맹점 등록이 취소돼요. 지역사랑상품권법 기준 취소 사유 4가지와 대응법을 안내해요.",
    type: "article",
  },
  alternates: { canonical: "/w/지역사랑상품권-가맹점-등록취소-사유" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

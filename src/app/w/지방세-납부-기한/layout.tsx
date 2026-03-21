import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "지방세 납부 기한과 가산금 — 연체 시 계산 방법과 위택스 납부",
  description: "지방세 납부기한 넘기면 즉시 3% 가산금 + 매월 0.66% 추가돼요. 100만원을 6개월 연체하면 약 9만원이에요. 세목별 기한과 연체 시 제재 단계 안내해요.",
  openGraph: {
    title: "지방세 납부 기한과 가산금 — 연체 시 계산 방법과 위택스 납부",
    description: "지방세 납부기한 넘기면 즉시 3% 가산금 + 매월 0.66% 추가돼요. 100만원을 6개월 연체하면 약 9만원이에요. 세목별 기한과 연체 시 제재 단계 안내해요.",
    type: "article",
  },
  alternates: {
    canonical: "/w/지방세-납부-기한",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

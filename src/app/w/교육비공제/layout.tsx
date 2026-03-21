import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "교육비공제 한도와 계산법 — 본인·자녀별 공제 금액 2026",
  description: "교육비 세액공제 15%, 본인 무제한, 대학생 자녀 900만원, 초중고 300만원 한도예요. 2026년부터 만 9세 미만 예체능 학원비도 공제돼요. 실제 계산 예시 포함.",
  openGraph: {
    title: "교육비공제 한도와 계산법 — 본인·자녀별 공제 금액 2026",
    description: "교육비 세액공제 15%, 본인 무제한, 대학생 자녀 900만원, 초중고 300만원 한도예요. 2026년부터 만 9세 미만 예체능 학원비도 공제돼요. 실제 계산 예시 포함.",
    type: "article",
  },
  alternates: {
    canonical: "/w/교육비공제",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

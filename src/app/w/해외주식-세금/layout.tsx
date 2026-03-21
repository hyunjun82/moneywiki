import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "해외주식 세금 계산부터 신고까지 250만원 공제와 절세 전략",
  description: "해외주식 양도차익 250만원 공제 후 22% 세율, 손익통산 방법, 5월 홈택스 신고 절차와 미신고 가산세를 정리했어요.",
  alternates: {
    canonical: "/w/해외주식-세금",
  },
  openGraph: {
    title: "해외주식 세금 계산부터 신고까지 250만원 공제와 절세 전략",
    description: "해외주식 양도차익 250만원 공제 후 22% 세율, 손익통산 방법, 5월 홈택스 신고 절차와 미신고 가산세를 정리했어요.",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

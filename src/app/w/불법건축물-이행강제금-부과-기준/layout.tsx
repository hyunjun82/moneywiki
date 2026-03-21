import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "불법건축물 이행강제금 부과 기준, 감경 조건, 철거로 중단하는 법",
  description: "무단 증축 이행강제금 계산 공식과 부과율, 소유권 변경 시 75% 감경 조건, 철거하면 추가 부과가 멈추는 이유를 정리했어요.",
  alternates: {
    canonical: "/w/불법건축물-이행강제금-부과-기준",
  },
  openGraph: {
    title: "불법건축물 이행강제금 부과 기준, 감경 조건, 철거로 중단하는 법",
    description: "무단 증축 이행강제금 계산 공식과 부과율, 소유권 변경 시 75% 감경 조건, 철거하면 추가 부과가 멈추는 이유를 정리했어요.",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재산분할 대상 범위: 포함 자산 및 기준 완벽 정리 | 머니위키",
  description: "이혼할 때 나눌 수 있는 재산이 뭔지 알려드려요. 혼인 중 모은 재산은 전부 대상이고, 상속받은 재산은 원칙적으로 제외되지만 예외도 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재산분할-대상-범위" },
  openGraph: { title: "재산분할 대상 범위: 포함 자산 및 기준 완벽 정리", description: "이혼할 때 나눌 수 있는 재산이 뭔지 알려드려요. 혼인 중 모은 재산은 전부 대상이고, 상속받은 재산은 원칙적으로 제외되지만 예외도 있어요", url: "https://www.jjyu.co.kr/w/재산분할-대상-범위", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

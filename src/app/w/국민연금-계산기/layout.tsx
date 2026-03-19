import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "국민연금 계산기 | 머니위키",
  description: "국민연금 예상 수령액을 계산해보세요.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이혼 퇴직금 재산분할 | 재직 중 퇴직금도 분할 대상인지 | 머니위키",
  description:
    "아직 퇴직하지 않아 받지 않은 퇴직금도 재산분할 대상이 됩니다. 분할 대상이 되는 범위와 산정 기준, 청구 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-퇴직금-재산분할" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

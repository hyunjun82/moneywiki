import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "일반음식점을 사무실로 용도변경 절차 | 머니위키",
  description: "150제곱미터 4층 건물을 음식점에서 사무실로 바꾸려면 어떻게 하나요? 같은 시설군이면 간단해요.",
  openGraph: { title: "일반음식점을 사무실로 용도변경 절차", description: "150제곱미터 4층 건물을 음식점에서 사무실로 바꾸려면 어떻게 하나요? 같은 시설군이면 간단해요.", url: "https://jjyu.co.kr/w/일반음식점-사무실-용도변경-절차" },
  alternates: { canonical: "https://jjyu.co.kr/w/일반음식점-사무실-용도변경-절차" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

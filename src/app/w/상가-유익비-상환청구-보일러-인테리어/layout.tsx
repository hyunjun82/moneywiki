import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "상가 유익비 상환청구 보일러 인테리어 비용 2026",
  description: "사무실을 식당으로 바꾸려고 보일러, 주방, 페인트칠 다 했어요. 가게 닫고 이사 갈 때 건물주에게 비용 청구할 수 있나요?",
  openGraph: { title: "상가 유익비 상환청구 보일러 인테리어 비용 2026", description: "사무실을 식당으로 바꾸려고 보일러, 주방, 페인트칠 다 했어요. 가게 닫고 이사 갈 때 건물주에게 비용 청구할 수 있나요?", url: "https://jjyu.co.kr/w/상가-유익비-상환청구-보일러-인테리어" },
  alternates: { canonical: "https://jjyu.co.kr/w/상가-유익비-상환청구-보일러-인테리어" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

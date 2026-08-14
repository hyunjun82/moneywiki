import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "5세대 실손보험 차이: 4세대 비교",
  description: "5세대 실손보험이 4세대랑 뭐가 다른지 궁금하신가요? 비급여 50% 축소, 도수치료 제외, 중증 보장 강화까지 핵심 차이를 정리해드려요.",
  openGraph: { title: "5세대 실손보험 차이: 4세대 비교", description: "5세대 실손보험이 4세대랑 뭐가 다른지 궁금하신가요? 비급여 50% 축소, 도수치료 제외, 중증 보장 강화까지 핵심 차이를 정리해드려요.", url: "https://jjyu.co.kr/w/5세대-실손보험-4세대-차이" },
  alternates: { canonical: "https://jjyu.co.kr/w/5세대-실손보험-4세대-차이" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

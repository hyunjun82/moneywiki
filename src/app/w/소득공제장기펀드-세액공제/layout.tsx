import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "소득공제 장기펀드 세액공제 한도 2026 | 머니위키",
  description: "청년형 소득공제 장기펀드는 2025년 12월 종료됐는데요. 이미 가입했다면 10년 유지해야 혜택 받아요.",
  openGraph: { title: "소득공제 장기펀드 세액공제 한도 2026 | 머니위키", description: "청년형 소득공제 장기펀드는 2025년 12월 종료됐는데요. 이미 가입했다면 10년 유지해야 혜택 받아요.", url: "https://www.jjyu.co.kr/w/소득공제장기펀드-세액공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/소득공제장기펀드-세액공제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

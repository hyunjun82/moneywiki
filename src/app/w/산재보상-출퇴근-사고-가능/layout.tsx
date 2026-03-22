import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "출퇴근 중 사고, 산재 처리 되나요? 인정 요건과 신청 | 머니위키",
  description: "2018년부터 출퇴근 재해도 산재로 인정돼요. 합리적 경로·방법이면 산재보상 가능. 음주·무면허운전은 제외.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/산재보상-출퇴근-사고-가능" },
  openGraph: { title: "출퇴근 사고도 산재인가요?", description: "합리적 경로면 인정. 음주운전은 제외.", url: "https://www.jjyu.co.kr/w/산재보상-출퇴근-사고-가능", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

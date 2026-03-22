import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "채권 소멸시효 10년, 채무 승인하면 중단된다고? | 머니위키",
  description: "일부 변제·이자 지급만 해도 소멸시효가 리셋돼요. 10년 시효 기준, 채무승인 유형, 채권자·채무자 대응 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/채권-소멸시효-채무승인" },
  openGraph: {
    title: "채권 소멸시효 10년, 채무 승인하면 중단된다고? | 머니위키",
    description: "일부 변제·이자 지급만 해도 소멸시효가 리셋돼요. 10년 시효 기준, 채무승인 유형, 채권자·채무자 대응 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/채권-소멸시효-채무승인",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

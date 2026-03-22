import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "채권 소멸시효 10년 채무 승인 중단 2026 | 머니위키",
  description: "12년 전에 빌려준 돈인데 일부 갚았어요. 소멸시효 지나서 안 갚아도 되나요? 아니에요, 채무 승인하면 소멸시효가 중단되고 다시 10년이 시작돼요.",
  openGraph: { title: "채권 소멸시효 10년 채무 승인 중단 2026", description: "12년 전에 빌려준 돈인데 일부 갚았어요. 소멸시효 지나서 안 갚아도 되나요? 아니에요, 채무 승인하면 소멸시효가 중단되고 다시 10년이 시작돼요.", url: "https://jjyu.co.kr/w/채권-소멸시효-10년-채무승인-중단" },
  alternates: { canonical: "https://jjyu.co.kr/w/채권-소멸시효-10년-채무승인-중단" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

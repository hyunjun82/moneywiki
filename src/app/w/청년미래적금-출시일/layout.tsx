import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년미래적금 6월 출시 예정일과 신청 시기 | 머니위키",
  description: "청년미래적금은 2026년 6월에 출시돼요. 5월에 구체적인 일정 발표하고 6월부터 은행 앱에서 신청할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년미래적금-출시일" },
  openGraph: {
    title: "청년미래적금 6월 출시 예정일과 신청 시기",
    description: "청년미래적금은 2026년 6월에 출시돼요. 5월에 구체적인 일정 발표하고 6월부터 은행 앱에서 신청할 수 있어요.",
    url: "https://www.jjyu.co.kr/w/청년미래적금-출시일",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "국민성장펀드 소득공제 40% 조건 혜택",
  description: "국민성장펀드에 3년 이상 투자하면 최대 40% 소득공제받아요. 배당금은 9.9% 분리과세로 세금도 줄어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민성장펀드-소득공제-조건-혜택" },
  openGraph: { title: "국민성장펀드 소득공제 40% 조건 혜택 | 머니위키", description: "국민성장펀드에 3년 이상 투자하면 최대 40% 소득공제받아요. 배당금은 9.9% 분리과세로 세금도 줄어요.", url: "https://www.jjyu.co.kr/w/국민성장펀드-소득공제-조건-혜택", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

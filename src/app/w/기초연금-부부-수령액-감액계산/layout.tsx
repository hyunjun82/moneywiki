import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 부부가 둘 다 받으면? 부부 수령액과 감액 계산 | 머니위키",
  description: "기초연금 부부 수급 시 각각 20% 감액돼요. 2026년 부부 수령액과 감액 계산 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-부부-수령액-감액계산" },
  openGraph: {
    title: "기초연금 부부가 둘 다 받으면? 부부 수령액과 감액 계산 | 머니위키",
    description: "기초연금 부부 수급 시 각각 20% 감액돼요. 2026년 부부 수령액과 감액 계산 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-부부-수령액-감액계산",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

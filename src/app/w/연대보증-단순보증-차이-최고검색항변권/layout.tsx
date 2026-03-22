import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연대보증 vs 단순보증, 뭐가 다른가요? 최고·검색의 항변권과 책임 범위 | 머니위키",
  description: "연대보증인은 최고·검색의 항변권이 없어서 채권자가 바로 청구해도 거절 불가. 단순보증은 주채무자에게 먼저 가라고 요구 가능. 민법 제437조 기준.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연대보증-단순보증-차이-최고검색항변권",
  },
  openGraph: {
    title: "연대보증 vs 단순보증, 뭐가 다른가요? 최고·검색의 항변권과 책임 범위",
    description: "연대보증 = 항변권 없음, 전액 책임. 단순보증 = 보충적 책임. 핵심 차이 정리.",
    url: "https://www.jjyu.co.kr/w/연대보증-단순보증-차이-최고검색항변권",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

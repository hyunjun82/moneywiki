import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "펀드 판매수수료와 판매보수, 뭐가 다를까? 비용 구조 비교 | 머니위키",
  description: "판매수수료는 가입 시 한 번, 판매보수는 매년 기준가에서 빠지는 비용이에요. A클래스는 장기, C클래스는 단기에 유리하고, S/E 온라인 클래스가 비용이 가장 낮아요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/펀드-판매수수료-판매보수-차이",
  },
  openGraph: {
    title: "펀드 판매수수료와 판매보수, 뭐가 다를까?",
    description: "수수료는 1회성, 보수는 매년. A/C/S클래스 비용 비교와 선택법.",
    url: "https://www.jjyu.co.kr/w/펀드-판매수수료-판매보수-차이",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

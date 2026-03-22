import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금이랑 노령연금 같은 건가? 용어 차이와 구분법 | 머니위키",
  description: "기초연금과 노령연금은 완전히 다른 제도예요. 기초연금은 국가 세금으로, 노령연금은 국민연금 보험료로 지급돼요. 헷갈리는 용어를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-노령연금-용어차이-구분법" },
  openGraph: { title: "기초연금이랑 노령연금 같은 건가? 용어 차이와 구분법 | 머니위키", description: "기초연금과 노령연금은 완전히 다른 제도예요. 기초연금은 국가 세금으로, 노령연금은 국민연금 보험료로 지급돼요. 헷갈리는 용어를 정리했어요.", url: "https://www.jjyu.co.kr/w/기초연금-노령연금-용어차이-구분법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

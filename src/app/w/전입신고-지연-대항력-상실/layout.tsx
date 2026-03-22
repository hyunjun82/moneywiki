import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전입신고 늦었는데 보증금 괜찮을까? 대항력 상실 기준 | 머니위키",
  description: "전입신고 다음날 0시부터 대항력이 생겨요. 그 전에 저당권이 설정되면 경매에서 밀릴 수 있어요. 소액임차인 최우선변제와 대응 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/전입신고-지연-대항력-상실",
  },
  openGraph: {
    title: "전입신고 늦었는데 보증금 괜찮을까? 대항력 상실 기준",
    description: "전입신고 다음날 0시부터 대항력 발생. 지연 시 저당권에 밀릴 수 있어요.",
    url: "https://www.jjyu.co.kr/w/전입신고-지연-대항력-상실",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

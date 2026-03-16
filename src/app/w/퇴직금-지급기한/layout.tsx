import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지급기한, 14일 안에 안 들어오면? | 머니위키",
  description: "퇴직금 지급기한은 퇴사일로부터 14일이에요. 안 들어오면 연 20% 지연이자 청구와 노동청 신고가 가능하죠. 대응 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지급기한" },
  openGraph: {
    title: "퇴직금 지급기한, 14일 안에 안 들어오면? | 머니위키",
    description: "퇴직금 지급기한은 퇴사일로부터 14일이에요. 안 들어오면 연 20% 지연이자 청구와 노동청 신고가 가능하죠. 대응 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지급기한",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴사 후 퇴직금 지급 기한, 며칠 기다려야 하나요?",
  description: "퇴사 후 퇴직금은 14일 이내에 들어와야 해요. 안 들어오면 지연이자 청구와 노동청 신고가 가능하죠. 기한 계산법과 대응법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴사후-퇴직금-지급-기한" },
  openGraph: {
    title: "퇴사 후 퇴직금 지급 기한, 며칠 기다려야 하나요? | 머니위키",
    description: "퇴사 후 퇴직금은 14일 이내에 들어와야 해요. 안 들어오면 지연이자 청구와 노동청 신고가 가능하죠. 기한 계산법과 대응법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴사후-퇴직금-지급-기한",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

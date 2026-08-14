import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지급 기한, 퇴사 후 언제까지 받아야 하나요?",
  description: "퇴직금은 퇴사일로부터 14일 이내에 지급해야 해요. 기한을 넘기면 연 20% 지연이자가 붙고, 노동청 신고도 가능하죠. 지급 기한과 대응 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지급-기한" },
  openGraph: {
    title: "퇴직금 지급 기한, 퇴사 후 언제까지 받아야 하나요? | 머니위키",
    description: "퇴직금은 퇴사일로부터 14일 이내에 지급해야 해요. 기한을 넘기면 연 20% 지연이자가 붙고, 노동청 신고도 가능하죠. 지급 기한과 대응 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지급-기한",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

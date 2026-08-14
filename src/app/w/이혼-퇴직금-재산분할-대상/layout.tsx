import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 시 퇴직금 재산분할, 상대방 몫이 될 수 있나요?",
  description: "이혼 시 퇴직금은 혼인 기간에 해당하는 부분이 재산분할 대상이 돼요. 아직 받지 않은 퇴직금 포함 여부와 비율을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-퇴직금-재산분할-대상" },
  openGraph: {
    title: "이혼 시 퇴직금 재산분할, 상대방 몫이 될 수 있나요? | 머니위키",
    description: "이혼 시 퇴직금은 혼인 기간에 해당하는 부분이 재산분할 대상이 돼요. 아직 받지 않은 퇴직금 포함 여부와 비율을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/이혼-퇴직금-재산분할-대상",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

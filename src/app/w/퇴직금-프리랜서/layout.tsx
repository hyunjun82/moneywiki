import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 프리랜서 적용 여부, 어떻게 판단하나요?",
  description: "프리랜서 계약이라도 근로자성이 인정되면 퇴직금을 받을 수 있어요. 판례 기준과 노동청 진정 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-프리랜서" },
  openGraph: {
    title: "퇴직금 프리랜서 적용 여부, 어떻게 판단하나요? | 머니위키",
    description: "프리랜서 계약이라도 근로자성이 인정되면 퇴직금을 받을 수 있어요. 판례 기준과 노동청 진정 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-프리랜서",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

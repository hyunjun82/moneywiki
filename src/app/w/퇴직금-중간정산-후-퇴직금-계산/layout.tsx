import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 중간정산 후 퇴직금 계산, 어떻게 달라지나요? | 머니위키",
  description: "퇴직금 중간정산 후 근속연수가 리셋되면서 최종 퇴직금 계산이 달라져요. 새 기산점과 계산 예시를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중간정산-후-퇴직금-계산" },
  openGraph: {
    title: "퇴직금 중간정산 후 퇴직금 계산, 어떻게 달라지나요? | 머니위키",
    description: "퇴직금 중간정산 후 근속연수가 리셋되면서 최종 퇴직금 계산이 달라져요. 새 기산점과 계산 예시를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중간정산-후-퇴직금-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

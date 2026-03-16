import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 중간정산 시 세금, 얼마나 내야 하나요? | 머니위키",
  description: "퇴직금 중간정산 시 퇴직소득세가 부과돼요. 근속연수가 짧아져 세금이 불리해질 수 있는 이유와 절세 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중간정산-세금" },
  openGraph: {
    title: "퇴직금 중간정산 시 세금, 얼마나 내야 하나요? | 머니위키",
    description: "퇴직금 중간정산 시 퇴직소득세가 부과돼요. 근속연수가 짧아져 세금이 불리해질 수 있는 이유와 절세 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중간정산-세금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

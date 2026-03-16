import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "방문판매원·독립계약자 퇴직금 미지급, 어떻게 대응하나요? | 머니위키",
  description: "방문판매원이나 독립계약자도 근로자성이 인정되면 퇴직금을 받을 수 있어요. 근로자성 판단 기준과 신고 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/방문판매원-독립계약자-퇴직금-미지급-대응" },
  openGraph: {
    title: "방문판매원·독립계약자 퇴직금 미지급, 어떻게 대응하나요? | 머니위키",
    description: "방문판매원이나 독립계약자도 근로자성이 인정되면 퇴직금을 받을 수 있어요. 근로자성 판단 기준과 신고 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/방문판매원-독립계약자-퇴직금-미지급-대응",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

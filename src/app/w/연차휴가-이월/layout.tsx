import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연차휴가 이월, 다음 해로 넘길 수 있을까? | 머니위키",
  description: "연차휴가는 법적으로 이월 의무가 없어요. 회사 취업규칙에 이월 조항이 있으면 가능하고, 없으면 연차수당으로 정산받아요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연차휴가-이월",
  },
  openGraph: {
    title: "연차휴가 이월, 다음 해로 넘길 수 있을까?",
    description: "근로기준법에는 이월 의무가 없어요. 회사 규정 확인 방법부터 수당 청구까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연차휴가-이월",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

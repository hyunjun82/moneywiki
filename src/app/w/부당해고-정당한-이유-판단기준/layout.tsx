import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "내 해고, 정당한 이유가 맞나요? 부당해고 판단기준과 구제 방법",
  description: "정당한 해고는 사회통념상 근로관계를 계속할 수 없을 정도로 중대한 사유가 있어야 해요. 입증 책임은 회사 측이고, 부당하면 해고일로부터 3개월 내에 노동위원회에 구제신청 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/부당해고-정당한-이유-판단기준",
  },
  openGraph: {
    title: "내 해고, 정당한 이유가 맞나요? 부당해고 판단기준과 구제 방법",
    description: "정당한 해고 기준, 부당해고 판단 체크리스트, 구제신청 절차.",
    url: "https://www.jjyu.co.kr/w/부당해고-정당한-이유-판단기준",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

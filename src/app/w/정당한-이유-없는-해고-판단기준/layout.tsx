import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "정당한 해고 판단기준: 정당 사유 및 부당해고 구제 | 머니위키",
  description: "해고 통보받았는데 정당한 이유인지 모르겠다는 거 아시나요? 근로기준법 해고 사유와 대법원 판례 기준으로 부당해고 판단하는 방법 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/정당한-이유-없는-해고-판단기준" },
  openGraph: {
    title: "정당한 해고 판단기준: 정당 사유 및 부당해고 구제",
    description: "해고 통보받았는데 정당한 이유인지 모르겠다는 거 아시나요? 근로기준법 해고 사유와 대법원 판례 기준으로 부당해고 판단하는 방법 알려드려요",
    url: "https://www.jjyu.co.kr/w/정당한-이유-없는-해고-판단기준",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

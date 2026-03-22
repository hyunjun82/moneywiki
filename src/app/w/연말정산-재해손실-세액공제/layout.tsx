import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "화재 태풍 피해 입었다면? 재해손실 세액공제 신청 방법 | 머니위키",
  description: "천재지변이나 화재로 재산 피해를 입으면 재해손실 세액공제를 받을 수 있어요. 실제 손실액에서 보험금을 빼고 공제 신청하는 방법과 필요 서류를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-재해손실-세액공제",
  },
  openGraph: {
    title: "화재 태풍 피해 입었다면? 재해손실 세액공제 신청 방법",
    description: "재해손실액에서 보전액 빼고 세액공제. 신청 절차와 필요 서류.",
    url: "https://www.jjyu.co.kr/w/연말정산-재해손실-세액공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

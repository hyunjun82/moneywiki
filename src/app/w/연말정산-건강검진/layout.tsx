import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "건강검진 비용, 연말정산에서 돌려받을 수 있을까? | 머니위키",
  description: "종합검진 본인 부담분은 의료비 세액공제 대상이에요. 총급여 3% 초과분에 15% 공제율 적용. 국가건강검진(무료)과 회사 부담분은 제외돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-건강검진",
  },
  openGraph: {
    title: "건강검진 비용, 연말정산에서 돌려받을 수 있을까?",
    description: "종합검진 본인 부담분은 의료비 세액공제 대상. 총급여 3% 초과분에 15% 적용.",
    url: "https://www.jjyu.co.kr/w/연말정산-건강검진",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

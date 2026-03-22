import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임신 중 산부인과 비용, 연말정산 돼요? 의료비 공제부터 출산 세액공제까지 | 머니위키",
  description: "산부인과 진료비는 의료비 15% 세액공제 대상이에요. 출산하면 첫째 30만원, 둘째 50만원, 셋째 70만원 추가 공제. 산후조리원비는 200만원 한도, 소득 제한 없이 누구나 받아요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-임신",
  },
  openGraph: {
    title: "임신 중 산부인과 비용, 연말정산 돼요? 의료비 공제부터 출산 세액공제까지",
    description: "산부인과비 15% 공제, 출산 세액공제 30~70만원, 산후조리원 200만원.",
    url: "https://www.jjyu.co.kr/w/연말정산-임신",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

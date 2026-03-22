import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아이 낳으면 세금에서 얼마 빼주나요? 출산·입양 세액공제 금액과 신청법 | 머니위키",
  description: "출산·입양 세액공제는 첫째 30만원, 둘째 50만원, 셋째 70만원이에요. 자녀 세액공제와 별도로 중복 적용되고, 출산한 해에만 받는 일회성 공제예요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-출산-입양-세액공제",
  },
  openGraph: {
    title: "출산·입양 세액공제, 첫째 30만원~셋째 70만원",
    description: "출산한 해 일회성 공제. 자녀 세액공제와 중복 적용. 쌍둥이 계산법까지.",
    url: "https://www.jjyu.co.kr/w/연말정산-출산-입양-세액공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

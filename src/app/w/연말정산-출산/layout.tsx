import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "출산했는데 연말정산에서 뭘 돌려받나요? 출산 공제 항목과 환급액",
  description: "출산지원금 전액 비과세, 산후조리비 200만원 공제, 인적공제 150만원, 출산 세액공제 30~70만원까지. 출산 관련 연말정산 혜택을 빠짐없이 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-출산",
  },
  openGraph: {
    title: "출산 연말정산, 총 얼마나 돌려받을까?",
    description: "출산지원금 비과세+인적공제+출산세액공제+의료비, 100만원 넘는 환급 가능.",
    url: "https://www.jjyu.co.kr/w/연말정산-출산",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

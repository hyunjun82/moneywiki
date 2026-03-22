import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연금저축 세액공제 및 수령: 연금저축펀드·보험 가입 조건 | 머니위키",
  description: "연금저축 세액공제 받는 방법 궁금하시죠. 연 600만원까지 13.2~16.5% 세액공제 받고 55세 이후 연금으로 받아요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연금저축" },
  openGraph: { title: "연금저축 세액공제 및 수령: 연금저축펀드·보험 가입 조건 | 머니위키", description: "연금저축 세액공제 받는 방법 궁금하시죠. 연 600만원까지 13.2~16.5% 세액공제 받고 55세 이후 연금으로 받아요", url: "https://www.jjyu.co.kr/w/연금저축", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

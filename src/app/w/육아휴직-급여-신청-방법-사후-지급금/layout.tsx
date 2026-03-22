import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "2026년 육아휴직 급여 얼마? 사후지급금 폐지와 신청 방법 | 머니위키",
  description: "월 최대 250만원, 사후지급금 25% 폐지로 매달 전액 수령. 6+6 부모육아휴직제로 부부 동시 사용 시 월 450만원까지 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아휴직-급여-신청-방법-사후-지급금" },
  openGraph: {
    title: "2026년 육아휴직 급여 얼마? 사후지급금 폐지와 신청 방법 | 머니위키",
    description: "월 최대 250만원, 사후지급금 25% 폐지로 매달 전액 수령. 6+6 부모육아휴직제로 부부 동시 사용 시 월 450만원까지 가능해요.",
    url: "https://www.jjyu.co.kr/w/육아휴직-급여-신청-방법-사후-지급금",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

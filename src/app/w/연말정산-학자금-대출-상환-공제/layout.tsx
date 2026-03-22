import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "학자금 대출 갚으면 연말정산 되나? 교육비 공제 조건과 신청법 | 머니위키",
  description: "학자금 대출 원리금 상환액은 교육비 세액공제 15% 대상이에요. 본인 교육비는 한도 없이 전액 공제되죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-학자금-대출-상환-공제" },
  openGraph: {
    title: "학자금 대출 갚으면 연말정산 되나? 교육비 공제 조건과 신청법 | 머니위키",
    description: "학자금 대출 원리금 상환액은 교육비 세액공제 15% 대상이에요. 본인 교육비는 한도 없이 전액 공제되죠.",
    url: "https://www.jjyu.co.kr/w/연말정산-학자금-대출-상환-공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

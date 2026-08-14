import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "종신보험 사망보험금 상속세 내야 하나요? 계약 구조별 과세 기준",
  description: "피상속인이 계약자면 사망보험금에 상속세가 붙어요. 자녀가 계약자·수익자이고 직접 납부하면 비과세예요. 계약 구조별 과세 여부와 6개월 신고 기한을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/종신보험-사망보험금-상속세" },
  openGraph: {
    title: "종신보험 사망보험금 상속세 내야 하나요? 계약 구조별 과세 기준 | 머니위키",
    description: "피상속인이 계약자면 사망보험금에 상속세가 붙어요. 자녀가 계약자·수익자이고 직접 납부하면 비과세예요. 계약 구조별 과세 여부와 6개월 신고 기한을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/종신보험-사망보험금-상속세",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

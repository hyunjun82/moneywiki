import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "도서·공연·영화 공제 30% — 대상 항목과 한도 | 머니위키",
  description: "도서·공연·영화비는 30% 공제율로 신용카드 15%의 2배예요. 총급여 7천만원 이하 대상, 추가 한도 300만원과 공제 항목별 O/X를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-도서-공연-공제",
  },
  openGraph: {
    title: "도서·공연·영화 공제 30% — 대상 항목과 한도",
    description: "문화비 30% 공제, 총급여 7천만원 이하 대상, 공제 항목 O/X 비교표.",
    url: "https://www.jjyu.co.kr/w/연말정산-도서-공연-공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

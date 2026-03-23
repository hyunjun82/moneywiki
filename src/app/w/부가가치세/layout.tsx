import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부가가치세, 얼마나 내고 언제 신고하나요? 일반·간이과세자 기준과 신고법 | 머니위키",
  description: "부가가치세는 10% 세율로 매출세액에서 매입세액을 빼서 납부해요. 2026년 간이과세자 기준은 연 매출 1.04억 미만으로 변경. 홈택스 신고 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/부가가치세",
  },
  openGraph: {
    title: "부가가치세, 얼마나 내고 언제 신고하나요? 일반·간이과세자 기준",
    description: "10% 세율, 매출-매입 차액 납부. 2026년 간이과세 기준 1.04억 미만.",
    url: "https://www.jjyu.co.kr/w/부가가치세",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

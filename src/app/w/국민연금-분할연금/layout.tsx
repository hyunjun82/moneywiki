import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국민연금 분할연금, 이혼 후 조건·금액·신청 방법 | 머니위키",
  description: "이혼해도 혼인 기간 5년 이상이면 전 배우자 국민연금의 50%를 분할 수령할 수 있어요. 수급 연령, 금액 계산, 신청 서류와 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/국민연금-분할연금",
  },
  openGraph: {
    title: "국민연금 분할연금, 이혼 후 조건·금액·신청 방법",
    description: "혼인 기간 5년 이상이면 전 배우자 국민연금을 50% 분할 수령할 수 있어요.",
    url: "https://www.jjyu.co.kr/w/국민연금-분할연금",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

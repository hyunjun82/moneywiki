import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연차가 법정 기준보다 적으면 무효일까? 효력과 대응 방법",
  description: "근로기준법보다 적은 연차 조건은 무효예요. 무효 부분은 법정 기준(15일)이 자동 적용돼요. 부족한 연차 청구 방법도 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연차휴가-법이하-조건-효력",
  },
  openGraph: {
    title: "연차가 법정 기준보다 적으면 무효일까? 효력과 대응 방법",
    description: "법정 기준 미달 연차 조건 = 무효. 자동으로 15일 적용.",
    url: "https://www.jjyu.co.kr/w/연차휴가-법이하-조건-효력",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

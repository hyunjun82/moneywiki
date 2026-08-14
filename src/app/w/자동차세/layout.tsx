import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "자동차세 세율 및 납부 방법: 배기량별 과세 기준·연납 할인",
  description: "자동차세 얼마나 내는지 궁금하시죠. 배기량에 따라 cc당 80~200원이 부과되고 연납 시 할인받아요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자동차세" },
  openGraph: {
    title: "자동차세 세율 및 납부 방법: 배기량별 과세 기준·연납 할인",
    description: "자동차세 얼마나 내는지 궁금하시죠. 배기량에 따라 cc당 80~200원이 부과되고 연납 시 할인받아요",
    url: "https://www.jjyu.co.kr/w/자동차세",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

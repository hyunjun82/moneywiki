import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "자동차 이사 타지역 변경등록 의무 전국번호판 | 머니위키",
  description: "서울에서 청주로 이사했어요. 차량 변경등록 꼭 해야 하나요? 전국번호판이면 전입신고만 하면 되고, 지역번호판이면 30일 내 변경해야 해요.",
  openGraph: { title: "자동차 이사 타지역 변경등록 의무 전국번호판", description: "서울에서 청주로 이사했어요. 차량 변경등록 꼭 해야 하나요? 전국번호판이면 전입신고만 하면 되고, 지역번호판이면 30일 내 변경해야 해요.", url: "https://jjyu.co.kr/w/자동차-이사-타지역-변경등록" },
  alternates: { canonical: "https://jjyu.co.kr/w/자동차-이사-타지역-변경등록" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

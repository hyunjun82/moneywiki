import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "초중고 입학준비금 신청 방법과 교복 지원금 사용처",
  description: "초등 20만원, 중고 30만원. 2월에 온라인 신청, 제로페이 또는 교복으로 수령. 사용 가능 물품 정리.",
  openGraph: {
    title: "초중고 입학준비금 신청 방법과 교복 지원금 사용처",
    description: "신입생 전원 대상. 신청 기간 2월. 학용품, 의류, 신발, 도서 구매 가능.",
    url: "https://jjyu.co.kr/w/초중고-입학준비금-신청-방법-교복-지원금",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/초중고-입학준비금-신청-방법-교복-지원금",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

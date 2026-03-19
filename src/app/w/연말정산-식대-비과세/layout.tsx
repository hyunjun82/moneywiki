import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 식대 비과세 월 20만원 한도 조건 | 머니위키",
  description: "급여명세서에 식대 별도 표시 필수. 월 20만원까지 비과세, 구내식당 전액 비과세. 원천징수영수증에서 반영 여부 확인 방법.",
  openGraph: {
    title: "연말정산 식대 비과세 월 20만원 한도",
    description: "기본급 포함 식대는 비과세 안됨. 명세서 별도 표시 필수.",
    url: "https://jjyu.co.kr/w/연말정산-식대-비과세",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/연말정산-식대-비과세",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

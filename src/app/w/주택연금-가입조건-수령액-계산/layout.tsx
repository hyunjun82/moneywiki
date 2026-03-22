import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택연금 가입조건 수령액 계산 | 머니위키",
  description: "집만 있으면 평생 월급처럼 연금을 받는다는 거 아시나요? 55세 이상이고 공시가격 12억 이하면 가능한 조건부터 수령액 계산까지 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택연금-가입조건-수령액-계산" },
  openGraph: { title: "주택연금 가입조건 수령액 계산 | 머니위키", description: "집만 있으면 평생 월급처럼 연금을 받는다는 거 아시나요? 55세 이상이고 공시가격 12억 이하면 가능한 조건부터 수령액 계산까지 알려드려요", url: "https://www.jjyu.co.kr/w/주택연금-가입조건-수령액-계산", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

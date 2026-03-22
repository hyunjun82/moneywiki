import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "고령자 취업 프로그램 지원: 신청 방법 및 참여 조건 | 머니위키",
  description: "60세 이상도 일할 수 있다는 거 아시나요? 노인일자리사업 신청 방법과 참여 조건, 급여까지 한번에 알려드려요",
  openGraph: { title: "고령자 취업 프로그램 지원: 신청 방법 및 참여 조건", description: "60세 이상도 일할 수 있다는 거 아시나요? 노인일자리사업 신청 방법과 참여 조건, 급여까지 한번에 알려드려요", url: "https://jjyu.co.kr/w/고령자-취업-프로그램" },
  alternates: { canonical: "https://jjyu.co.kr/w/고령자-취업-프로그램" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

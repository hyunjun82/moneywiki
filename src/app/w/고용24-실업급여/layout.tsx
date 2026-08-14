import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "고용24 실업급여 신청 조회 방법  온라인 수급자격 통합포털",
  description: "고용24에서 실업급여 신청부터 조회까지 온라인으로 가능하다는 거 아시나요? 수급자격 통합포털 사용 방법과 온라인 신청 절차를 알려드려요.",
  openGraph: { title: "고용24 실업급여 신청 조회 방법  온라인 수급자격 통합포털", description: "고용24에서 실업급여 신청부터 조회까지 온라인으로 가능하다는 거 아시나요? 수급자격 통합포털 사용 방법과 온라인 신청 절차를 알려드려요.", url: "https://jjyu.co.kr/w/고용24-실업급여" },
  alternates: { canonical: "https://jjyu.co.kr/w/고용24-실업급여" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

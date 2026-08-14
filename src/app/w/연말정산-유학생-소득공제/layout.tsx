import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 유학생 교육비 소득공제 완벽 가이드",
  description: "해외 유학 중인 자녀 교육비도 연말정산에서 공제받을 수 있어요. 1인당 연 300만원 한도로 세액공제 15% 받아요.",
  openGraph: { title: "연말정산 유학생 교육비 소득공제 완벽 가이드", description: "해외 유학 중인 자녀 교육비도 연말정산에서 공제받을 수 있어요. 1인당 연 300만원 한도로 세액공제 15% 받아요.", url: "https://jjyu.co.kr/w/연말정산-유학생-소득공제" },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-유학생-소득공제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "감염병 휴업 배달기사 산재보험 유지 의무 감면",
  description: "감염병 휴업 중에도 배달기사 산재보험은 해지 불가. 보험료 감면 신청 방법과 미가입 시 사업주 부담 기준.",
  openGraph: {
    title: "감염병 휴업 배달기사 산재보험 유지 의무 감면",
    description: "휴업 중 산재보험 유지 의무, 감면 신청 절차, 해지 시 불이익.",
    url: "https://jjyu.co.kr/w/감염병-휴업-배달기사-산재보험-유지",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/감염병-휴업-배달기사-산재보험-유지" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

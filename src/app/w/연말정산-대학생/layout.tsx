import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 대학생",
  description: "대학생 자녀는 만 20세 이하면 인적공제받고, 등록금은 교육비 세액공제 대상이에요. 아르바이트 소득이 100만원 넘으면 공제 못 받아요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-대학생" },
  openGraph: { title: "연말정산 대학생", description: "대학생 자녀는 만 20세 이하면 인적공제받고, 등록금은 교육비 세액공제 대상이에요. 아르바이트 소득이 100만원 넘으면 공제 못 받아요.", url: "https://www.jjyu.co.kr/w/연말정산-대학생", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

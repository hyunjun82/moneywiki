import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "근로소득 원천징수 방법: 세율 계산 및 신고 절차",
  description: "회사에서 월급 줄 때마다 떼는 세금이 근로소득 원천징수예요. 세율 계산 방법부터 간이세액표 조회, 신고 절차까지 명확히 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로소득-원천징수-방법" },
  openGraph: {
    title: "근로소득 원천징수 방법: 세율 계산 및 신고 절차",
    description: "회사에서 월급 줄 때마다 떼는 세금이 근로소득 원천징수예요. 세율 계산 방법부터 간이세액표 조회, 신고 절차까지 명확히 알려드려요",
    url: "https://www.jjyu.co.kr/w/근로소득-원천징수-방법",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

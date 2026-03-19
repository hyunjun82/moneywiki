import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "원천징수란 월급에서 세금 떼는 이유 | 머니위키",
  description: "회사가 직원 대신 세금을 미리 내주는 원천징수. 근로소득 간이세액표, 프리랜서 3.3%, 비과세 소득 목록과 연말정산 관계.",
  openGraph: {
    title: "원천징수란 월급에서 세금 떼는 이유",
    description: "소득 종류별 원천징수율과 연말정산으로 정산하는 방법.",
    url: "https://jjyu.co.kr/w/원천징수",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/원천징수",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

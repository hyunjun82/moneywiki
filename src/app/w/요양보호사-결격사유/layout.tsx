import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "요양보호사 자격 결격사유: 제한 조건 및 해제 방법 | 머니위키",
  description: "요양보호사 자격증을 받을 수 없는 경우가 있다는 거 아시나요? 정신질환, 약물중독, 형사처벌 등 노인복지법상 결격사유와 해제 조건을 알려드려요",
  openGraph: { title: "요양보호사 자격 결격사유: 제한 조건 및 해제 방법", description: "요양보호사 자격증을 받을 수 없는 경우가 있다는 거 아시나요? 정신질환, 약물중독, 형사처벌 등 노인복지법상 결격사유와 해제 조건을 알려드려요", url: "https://jjyu.co.kr/w/요양보호사-결격사유" },
  alternates: { canonical: "https://jjyu.co.kr/w/요양보호사-결격사유" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

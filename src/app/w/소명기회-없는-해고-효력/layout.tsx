import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "해고 소명기회 의무: 절차 위반 효력 및 무효 판단 | 머니위키",
  description: "소명 기회 없이 해고당했다면 부당해고로 무효 처리될 수 있다는 거 아시나요? 근로기준법상 절차 위반 해고의 효력과 대응 방법 알려드려요",
  openGraph: { title: "해고 소명기회 의무: 절차 위반 효력 및 무효 판단", description: "소명 기회 없이 해고당했다면 부당해고로 무효 처리될 수 있다는 거 아시나요? 근로기준법상 절차 위반 해고의 효력과 대응 방법 알려드려요", url: "https://jjyu.co.kr/w/소명기회-없는-해고-효력" },
  alternates: { canonical: "https://jjyu.co.kr/w/소명기회-없는-해고-효력" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

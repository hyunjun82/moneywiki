import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 파트타임 3개월 이상 근무하면 환급 | 머니위키",
  description: "파트타임도 3개월 이상 근무하면 연말정산 대상이에요. 정규직과 동일하게 공제받고, 소득 적으면 세금 전액 환급 가능해요.",
  openGraph: {
    title: "연말정산 파트타임 3개월 이상 근무하면 환급",
    description: "파트타임 연말정산 대상 기준, 공제 항목, 환급 절차를 정리했어요.",
    url: "https://jjyu.co.kr/w/연말정산-파트타임",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-파트타임" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

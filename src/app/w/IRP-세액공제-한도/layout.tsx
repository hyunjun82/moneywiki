import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "IRP 세액공제 한도, 연금저축 합산 900만원 구조와 환급액 | 머니위키",
  description: "IRP는 연간 최대 900만원까지 세액공제 받을 수 있어요. 연금저축 합산 한도, 총급여별 공제율 16.5%·13.2% 차이, 실제 환급액 계산까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/IRP-세액공제-한도",
  },
  openGraph: {
    title: "IRP 세액공제 한도, 연금저축 합산 900만원 구조와 환급액",
    description: "IRP + 연금저축 합산 900만원 한도 구조, 총급여별 환급액, 연말정산 신청 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/IRP-세액공제-한도",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 IRP 세액공제, 최대 148만원 환급 방법",
  description: "IRP에 900만원 넣으면 연말정산 때 최대 148만원 돌려받아요. 공제율 16.5%·13.2% 차이, 연금저축 합산 한도, 신청 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-IRP-세액공제",
  },
  openGraph: {
    title: "연말정산 IRP 세액공제, 최대 148만원 환급 방법",
    description: "IRP 세액공제 공제율, 연금저축 합산 한도 900만원, 연말정산 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-IRP-세액공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

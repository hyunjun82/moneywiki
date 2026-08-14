import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 연금저축 공제, 600만원 한도와 환급액 계산",
  description: "연금저축 600만원 납입 시 최대 99만원 환급. IRP 합산 900만원 한도, 공제율 16.5%·13.2%, 중도해지 페널티까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-연금저축-공제",
  },
  openGraph: {
    title: "연말정산 연금저축 공제, 600만원 한도와 환급액 계산",
    description: "연금저축 600만원 → 99만원 환급. IRP 합산 900만원, 공제율 16.5%/13.2% 비교.",
    url: "https://www.jjyu.co.kr/w/연말정산-연금저축-공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소상공인 경영안정 바우처 매출 계산 방법 | 1억 400만원 기준",
  description:
    "소상공인 경영안정 바우처의 매출 기준 1억 400만원은 어떻게 계산할까요. 연매출 산정 기간, 부가세 신고 기준, 공동사업자·다점포 계산 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/소상공인-경영안정-바우처-매출-계산" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

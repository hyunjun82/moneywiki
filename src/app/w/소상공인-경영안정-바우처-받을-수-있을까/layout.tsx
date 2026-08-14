import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소상공인 경영안정 바우처 대상 조건 | 매출 기준·제외 대상 확인 | 머니위키",
  description:
    "2025년 연매출이 0원 초과 1억 400만원 미만이면 25만원 바우처 대상입니다. 매출 기준과 개업일 요건, 제외 대상, 2025년 개업자의 매출 환산 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/소상공인-경영안정-바우처-받을-수-있을까" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

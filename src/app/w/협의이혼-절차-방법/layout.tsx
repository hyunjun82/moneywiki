import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "협의이혼 절차 방법 | 신청부터 이혼 확정까지 기간·서류·주의사항 | 머니위키",
  description:
    "협의이혼은 합의해도 바로 되지 않습니다. 숙려기간(자녀 있으면 3개월, 없으면 1개월)을 포함한 5단계 절차, 필요 서류, 관할 법원, 주의사항을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/협의이혼-절차-방법" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

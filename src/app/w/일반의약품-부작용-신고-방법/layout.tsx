import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "일반의약품 부작용 신고 방법 | 피해구제 보상금 신청까지 | 머니위키",
  description:
    "약국에서 산 일반의약품으로 부작용이 생겼을 때 신고하는 방법과 의약품 부작용 피해구제 보상금 신청 절차, 필요 서류, 접수처를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/일반의약품-부작용-신고-방법" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

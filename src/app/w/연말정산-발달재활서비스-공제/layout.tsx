import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 발달재활서비스 공제 장애인 등록 없이 200만원 추가공제",
  description: "발달재활서비스 이용 아동은 장애인 등록 없이 추가공제 200만원 적용. 기본공제 150만원 합산 350만원 소득공제. 이용증명서 1장만 필요.",
  openGraph: {
    title: "연말정산 발달재활서비스 공제: 장애인 등록 없이 200만원",
    description: "이용증명서 1장으로 추가공제 200만원. 간소화서비스 자동 조회 안 되니 직접 챙기세요.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "건강보험료 연말정산 추가납부 4월에 급여 줄어든 이유와 계산법",
  description: "건강보험료 연말정산은 매년 4월, 전년도 실제 소득으로 재계산해요. 추가납부 계산 공식, 분할 납부 조건, 환급 방법을 정리했어요.",
  alternates: {
    canonical: "/w/건강보험료-연말정산-추가납부",
  },
  openGraph: {
    title: "건강보험료 연말정산 추가납부 4월에 급여 줄어든 이유와 계산법",
    description: "건강보험료 연말정산은 매년 4월, 전년도 실제 소득으로 재계산해요. 추가납부 계산 공식, 분할 납부 조건, 환급 방법을 정리했어요.",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

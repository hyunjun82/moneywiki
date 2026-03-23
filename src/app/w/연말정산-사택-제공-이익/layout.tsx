import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 사택 제공 이익, 비과세 조건과 과세 계산 | 머니위키",
  description: "회사 사택은 전용면적 85㎡ 이하 + 기준시가 3억원 이하면 비과세예요. 조건 미충족 시 과세 금액 계산 방법과 기숙사 적용 기준을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-사택-제공-이익",
  },
  openGraph: {
    title: "연말정산 사택 제공 이익, 비과세 조건과 과세 계산",
    description: "사택 비과세: 85㎡ 이하 + 3억 이하. 과세 시 월세 시가로 근로소득 추가.",
    url: "https://www.jjyu.co.kr/w/연말정산-사택-제공-이익",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

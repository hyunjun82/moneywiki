import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "감염병으로 회사가 쉬는데, 급여는? 휴업수당 지급 기준과 청구 방법 | 머니위키",
  description: "사용자 귀책사유 휴업이면 평균임금의 70%를 휴업수당으로 받을 수 있어요. 정부 방역 명령은 불가항력으로 다르게 판단돼요. 휴업수당 청구 절차와 고용유지지원금까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/감염병-휴업-급여-지급",
  },
  openGraph: {
    title: "감염병으로 회사가 쉬는데, 급여는? 휴업수당 지급 기준과 청구 방법",
    description: "사용자 귀책 = 평균임금 70% 지급. 불가항력 = 다르게 판단. 청구 절차 정리.",
    url: "https://www.jjyu.co.kr/w/감염병-휴업-급여-지급",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

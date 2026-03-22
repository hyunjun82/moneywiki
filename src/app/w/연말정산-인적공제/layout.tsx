import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "인적공제, 1인당 150만원씩 — 부양가족 요건과 추가공제 계산법 | 머니위키",
  description: "연말정산 인적공제는 부양가족 1인당 150만원 소득공제예요. 나이·소득 요건, 경로우대 100만원·장애인 200만원 추가공제, 중복공제 불가 규칙을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-인적공제" },
  openGraph: {
    title: "인적공제, 1인당 150만원씩 — 부양가족 요건과 추가공제 계산법 | 머니위키",
    description: "연말정산 인적공제는 부양가족 1인당 150만원 소득공제예요. 나이·소득 요건, 경로우대 100만원·장애인 200만원 추가공제, 중복공제 불가 규칙을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-인적공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

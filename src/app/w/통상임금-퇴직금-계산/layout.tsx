import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "통상임금으로 퇴직금 계산, 언제 유리한가요? | 머니위키",
  description: "평균임금보다 통상임금이 높으면 통상임금이 퇴직금 기준이 돼요. 포함 항목, 잘못된 계산 대응법, 적용 요구 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/통상임금-퇴직금-계산" },
  openGraph: {
    title: "통상임금으로 퇴직금 계산, 언제 유리한가요? | 머니위키",
    description: "평균임금보다 통상임금이 높으면 통상임금이 퇴직금 기준이 돼요. 포함 항목, 잘못된 계산 대응법, 적용 요구 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/통상임금-퇴직금-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

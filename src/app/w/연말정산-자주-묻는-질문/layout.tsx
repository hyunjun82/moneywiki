import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산, 매년 헷갈리는 질문 7가지 일정부터 환급금까지",
  description: "간소화서비스 1월 15일 오픈, 환급금은 2~3월 급여에 포함돼요. 부양가족 조건, 맞벌이 전략, 놓쳤을 때 대응법까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-자주-묻는-질문",
  },
  openGraph: {
    title: "연말정산 자주 묻는 질문 7가지",
    description: "일정, 환급금, 부양가족, 맞벌이 전략까지 한 번에.",
    url: "https://www.jjyu.co.kr/w/연말정산-자주-묻는-질문",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "사업장 밖 업무 사고, 산재 인정될까? 출장·외근 중 재해 기준",
  description: "출장·외근·배달 중 사고는 업무상 재해로 인정돼요. 산업재해보상보험법 기준 사업장 밖 산재 인정 범위, 출퇴근 재해, 신청 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/산재보상-사업장-밖-업무-사고" },
  openGraph: {
    title: "사업장 밖 업무 사고, 산재 인정될까? 출장·외근 중 재해 기준 | 머니위키",
    description: "출장·외근·배달 중 사고는 업무상 재해로 인정돼요. 산업재해보상보험법 기준 사업장 밖 산재 인정 범위, 출퇴근 재해, 신청 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/산재보상-사업장-밖-업무-사고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

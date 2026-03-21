import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "여러 명이 동순위 근저당권 공동설정 가능한가요? 지분 비율 배당 계산 | 머니위키",
  description: "같은 날 같은 접수번호로 등기하면 각자 명의로 동순위 근저당권 설정이 가능해요. 채권최고액 비율대로 경매 배당을 받는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근저당권-공동설정-동순위-지분비율" },
  openGraph: {
    title: "여러 명이 동순위 근저당권 공동설정 가능한가요? 지분 비율 배당 계산 | 머니위키",
    description: "같은 날 같은 접수번호로 등기하면 각자 명의로 동순위 근저당권 설정이 가능해요. 채권최고액 비율대로 경매 배당을 받는 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/근저당권-공동설정-동순위-지분비율",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

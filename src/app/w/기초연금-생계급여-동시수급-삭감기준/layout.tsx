import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기초연금이랑 생계급여 같이 받으면 깎일까? 동시 수급과 삭감 기준",
  description: "기초연금과 생계급여는 동시에 받을 수 있지만, 기초연금만큼 생계급여가 줄어들 수 있어요. 삭감 기준과 실수령액 계산법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-생계급여-동시수급-삭감기준" },
  openGraph: {
    title: "기초연금이랑 생계급여 같이 받으면 깎일까? 동시 수급과 삭감 기준 | 머니위키",
    description: "기초연금과 생계급여는 동시에 받을 수 있지만, 기초연금만큼 생계급여가 줄어들 수 있어요. 삭감 기준과 실수령액 계산법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-생계급여-동시수급-삭감기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

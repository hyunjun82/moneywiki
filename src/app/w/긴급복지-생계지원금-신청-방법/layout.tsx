import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "긴급복지 생계지원금 신청 방법, 129 전화 한 통으로 48시간 안에 받기",
  description: "갑작스러운 실직·사고로 생활비가 없을 때 긴급복지 생계지원금을 받는 방법이에요. 위기사유 조건, 가구별 금액(1인 71만원~), 신청 절차를 정리했어요.",
  openGraph: {
    title: "긴급복지 생계지원금 신청 방법, 129 전화 한 통으로 48시간 안에 받기 | 머니위키",
    description: "갑작스러운 위기상황에서 생활비를 먼저 받는 긴급복지 생계지원금 신청 방법이에요. 위기사유, 금액, 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/긴급복지-생계지원금-신청-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/긴급복지-생계지원금-신청-방법" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

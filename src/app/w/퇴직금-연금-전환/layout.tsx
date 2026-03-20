import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금을 그냥 꺼내면 손해예요 IRP 연금 전환으로 퇴직소득세 30~40% 절감하는 법 | 머니위키",
  description: "IRP 연금 전환 조건(55세 이상, 5년 이상)부터 10년·20년 수령 시 절세 효과, 신청 4단계까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-연금-전환" },
  openGraph: {
    title: "퇴직금을 그냥 꺼내면 손해예요 IRP 연금 전환으로 퇴직소득세 30~40% 절감하는 법 | 머니위키",
    description: "IRP 연금 전환 조건(55세 이상, 5년 이상)부터 10년·20년 수령 시 절세 효과, 신청 4단계까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-연금-전환",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

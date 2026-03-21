import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 수수료, 0.3% 차이가 30년이면 1,200만원 | 머니위키",
  description: "IRP 증권사 비대면 수수료 0%, 은행 0.1~0.2%. 30년 적립 시 수수료 차이로 1,200만원 벌어져요. 금융사별 비교와 절감 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-수수료" },
  openGraph: {
    title: "퇴직연금 수수료, 0.3% 차이가 30년이면 1,200만원 | 머니위키",
    description: "IRP 증권사 비대면 수수료 0%, 은행 0.1~0.2%. 30년 적립 시 수수료 차이로 1,200만원 벌어져요. 금융사별 비교와 절감 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-수수료",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

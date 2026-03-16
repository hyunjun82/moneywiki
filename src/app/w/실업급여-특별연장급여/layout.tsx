import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "수급 끝났는데 아직 미취업? 특별연장급여 조건과 신청 절차 | 머니위키",
  description: "경기 침체로 취업이 어려울 때 정부가 실업급여를 60일 연장해주는 특별연장급여 제도를 정리했어요. 시행 조건, 금액, 다른 연장급여와의 차이까지 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-특별연장급여" },
  openGraph: {
    title: "수급 끝났는데 아직 미취업? 특별연장급여 조건과 신청 절차 | 머니위키",
    description: "경기 침체로 취업이 어려울 때 정부가 실업급여를 60일 연장해주는 특별연장급여 제도를 정리했어요. 시행 조건, 금액, 다른 연장급여와의 차이까지 알려드려요.",
    url: "https://www.jjyu.co.kr/w/실업급여-특별연장급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 ETF, 뭘 사야 할까? — 안전자산 30% 맞추는 포트폴리오 | 머니위키",
  description: "DC형·IRP 퇴직연금 ETF 투자 방법이에요. 안전자산 30% 규정, 위험·안전자산 ETF 목록, 포트폴리오 예시, 운용보수 비교까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-etf-추천" },
  openGraph: {
    title: "퇴직연금 ETF, 뭘 사야 할까? — 안전자산 30% 맞추는 포트폴리오 | 머니위키",
    description: "DC형·IRP 퇴직연금 ETF 투자 방법이에요. 안전자산 30% 규정, 위험·안전자산 ETF 목록, 포트폴리오 예시, 운용보수 비교까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-etf-추천",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 ETF·펀드 운용 방법, 수익률 높이는 전략 | 머니위키",
  description: "DC형·IRP 퇴직연금은 위험자산 70%, 안전자산 30% 규칙 안에서 ETF로 굴리면 연 7~8% 수익을 노릴 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-운용-방법-ETF-펀드-선택-전략" },
  openGraph: {
    title: "퇴직연금 ETF·펀드 운용 방법, 수익률 높이는 전략 | 머니위키",
    description: "DC형·IRP 퇴직연금은 위험자산 70%, 안전자산 30% 규칙 안에서 ETF로 굴리면 연 7~8% 수익을 노릴 수 있어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-운용-방법-ETF-펀드-선택-전략",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

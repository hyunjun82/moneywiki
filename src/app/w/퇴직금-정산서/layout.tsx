import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 정산서, 서명 전에 꼭 확인해야 할 것들 | 머니위키",
  description: "퇴직금 정산서에 서명하기 전 금액, 포함 항목, 계산 근거를 반드시 확인하세요. 잘못된 정산서 대응법도 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-정산서" },
  openGraph: {
    title: "퇴직금 정산서, 서명 전에 꼭 확인해야 할 것들 | 머니위키",
    description: "퇴직금 정산서에 서명하기 전 금액, 포함 항목, 계산 근거를 반드시 확인하세요. 잘못된 정산서 대응법도 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-정산서",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

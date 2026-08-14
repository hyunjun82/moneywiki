import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 DB형 DC형 차이 — 수령액·운용·이직 비교",
  description: "DB형은 회사가 금액 보장, DC형은 본인이 직접 운용해요. 이직·파산·수익 시나리오별 비교로 내 상황에 맞는 선택을 할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-DB형-DC형-차이-수령액-운용-비교" },
  openGraph: {
    title: "퇴직연금 DB형 DC형 차이 — 수령액·운용·이직 비교 | 머니위키",
    description: "DB형은 회사가 금액 보장, DC형은 본인이 직접 운용해요. 이직·파산·수익 시나리오별 비교로 내 상황에 맞는 선택을 할 수 있어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-DB형-DC형-차이-수령액-운용-비교",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

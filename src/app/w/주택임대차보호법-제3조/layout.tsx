import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주택임대차보호법 제3조, 대항력이란? 전입신고로 보증금 지키는 법 | 머니위키",
  description: "이사하고 전입신고하면 새 집주인에게도 보증금을 보호받을 수 있어요. 대항력 요건, 효력 시점, 확정일자 차이까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/주택임대차보호법-제3조",
  },
  openGraph: {
    title: "주택임대차보호법 제3조, 대항력이란? 전입신고로 보증금 지키는 법",
    description: "주택 인도 + 전입신고 = 대항력 확보. 새 집주인·경매 낙찰자에게 보증금 주장 가능.",
    url: "https://www.jjyu.co.kr/w/주택임대차보호법-제3조",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

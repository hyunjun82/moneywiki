import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "무보험 교통사고, 정부 보상 얼마까지? 보장사업 신청 방법 | 머니위키",
  description: "무보험 차량 사고 피해자는 정부 보장사업으로 사망 최대 1억5천만원, 부상 최대 3천만원까지 보상받아요. 청구 절차와 필요 서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/무보험-교통사고-정부-보상" },
  openGraph: {
    title: "무보험 교통사고, 정부 보상 얼마까지? 보장사업 신청 방법 | 머니위키",
    description: "무보험 차량 사고 피해자는 정부 보장사업으로 사망 최대 1억5천만원, 부상 최대 3천만원까지 보상받아요. 청구 절차와 필요 서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/무보험-교통사고-정부-보상",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

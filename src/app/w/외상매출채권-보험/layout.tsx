import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "외상매출채권 보험, 거래처 부도 시 최대 90% 보상받는 방법",
  description: "외상매출채권 보험 가입하면 거래처 부도 시 외상 대금의 최대 90%를 보상받아요. 보험료 0.5~2%, 한국무역보험공사·신용보증기금에서 신청 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/외상매출채권-보험",
  },
  openGraph: {
    title: "외상매출채권 보험, 거래처 부도 시 최대 90% 보상",
    description: "외상 대금 3천만원 중 2,700만원 보상. 가입 방법과 보상 기준.",
    url: "https://www.jjyu.co.kr/w/외상매출채권-보험",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "OTP 발급, 어디서 어떻게 받나요? 종류별 비용과 발급 절차 | 머니위키",
  description: "디지털OTP는 은행 앱에서 무료로 5분이면 발급돼요. 토큰형은 영업점에서 3,000원, 카드형은 10,000원이에요. 하나의 토큰형 OTP로 여러 은행에 등록해 공동 사용 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/OTP발급-방법",
  },
  openGraph: {
    title: "OTP 발급, 어디서 어떻게 받나요? 종류별 비용과 발급 절차",
    description: "디지털OTP 무료, 토큰형 3,000원, 카드형 10,000원. 발급 절차와 은행별 지원 현황.",
    url: "https://www.jjyu.co.kr/w/OTP발급-방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

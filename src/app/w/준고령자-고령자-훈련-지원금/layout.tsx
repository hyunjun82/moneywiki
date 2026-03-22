import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "준고령자 고령자 훈련 지원금 신청 방법 자격 | 머니위키",
  description: "50세 이상 직업훈련비 지원. 사업주 훈련비 100% 환급, 개인 내일배움카드 연 300만원 한도. 신청 절차와 자격 조건.",
  openGraph: { title: "준고령자 고령자 훈련 지원금 신청 방법", description: "50세 이상 사업주·개인 훈련비 지원 방법.", url: "https://jjyu.co.kr/w/준고령자-고령자-훈련-지원금" },
  alternates: { canonical: "https://jjyu.co.kr/w/준고령자-고령자-훈련-지원금" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

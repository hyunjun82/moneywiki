import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "재건축사업, 어디서부터 어떻게 진행되나요? 7단계 절차와 지원 방법 | 머니위키",
  description: "재건축은 기본계획부터 청산까지 7단계를 거쳐요. 10~15년 소요되고, 구청 무료 상담과 전문관리업체 지원을 받을 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/재건축사업-절차-지원-정보",
  },
  openGraph: {
    title: "재건축사업 7단계 절차와 지원받는 방법",
    description: "10~15년 소요되는 재건축, 단계별 정리와 지원 채널.",
    url: "https://www.jjyu.co.kr/w/재건축사업-절차-지원-정보",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

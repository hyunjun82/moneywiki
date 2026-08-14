import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고령자 훈련비 최대 500만원, 국민내일배움카드 신청 방법",
  description: "만 75세 미만이면 국민내일배움카드로 5년간 최대 500만원 훈련비를 지원받을 수 있어요. 45세 이상 대기업도 가능. 신청 절차와 훈련장려금을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고령자-근로자-훈련-지원" },
  openGraph: {
    title: "고령자 훈련비 최대 500만원, 국민내일배움카드 신청 방법 | 머니위키",
    description: "만 75세 미만이면 국민내일배움카드로 5년간 최대 500만원 훈련비를 지원받을 수 있어요. 45세 이상 대기업도 가능. 신청 절차와 훈련장려금을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/고령자-근로자-훈련-지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

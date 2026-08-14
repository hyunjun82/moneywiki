import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보험금 청구, 어떻게 하나요? 절차 5단계와 지급기한 정리",
  description: "보험금 청구 절차 5단계, 3영업일 지급기한, 필요 서류, 청구권 소멸시효 3년, 거절 시 금감원 민원 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보험금-청구-절차-지급기한" },
  openGraph: {
    title: "보험금 청구, 어떻게 하나요? 절차 5단계와 지급기한 정리 | 머니위키",
    description: "보험금 청구 절차 5단계, 3영업일 지급기한, 필요 서류, 청구권 소멸시효 3년, 거절 시 금감원 민원 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/보험금-청구-절차-지급기한",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 미지급 청구 기한, 3년 안에 해야 하나요?",
  description: "퇴직금 청구권 소멸시효는 퇴직일로부터 3년이에요. 기한이 다가온다면 시효 중단 방법과 지연이자 청구까지 함께 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-미지급-청구-기한-지연이자" },
  openGraph: {
    title: "퇴직금 미지급 청구 기한, 3년 안에 해야 하나요? | 머니위키",
    description: "퇴직금 청구권 소멸시효는 퇴직일로부터 3년이에요. 기한이 다가온다면 시효 중단 방법과 지연이자 청구까지 함께 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-미지급-청구-기한-지연이자",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

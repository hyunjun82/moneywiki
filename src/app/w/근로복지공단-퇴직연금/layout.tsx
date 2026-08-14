import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근로복지공단 퇴직연금, 뭐가 좋나? 푸른씨앗 가입 조건과 혜택",
  description: "푸른씨앗은 30인 미만 중소기업을 위한 퇴직연금이에요. 수수료 3년 면제, 정부 지원금 10% 적립 혜택이 있죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로복지공단-퇴직연금" },
  openGraph: {
    title: "근로복지공단 퇴직연금, 뭐가 좋나? 푸른씨앗 가입 조건과 혜택 | 머니위키",
    description: "푸른씨앗은 30인 미만 중소기업을 위한 퇴직연금이에요. 수수료 3년 면제, 정부 지원금 10% 적립 혜택이 있죠.",
    url: "https://www.jjyu.co.kr/w/근로복지공단-퇴직연금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

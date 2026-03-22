import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "체납 세금, 나눠서 낼 수 있을까? 분할납부 조건과 신청 방법 | 머니위키",
  description: "납부세액 1,000만원 초과 시 분할납부 가능해요. 홈택스에서 납부기한 3일 전까지 신청하면 2개월 이내로 나눠 낼 수 있고, 승인되면 가산세가 면제돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/체납-세금-분할-납부",
  },
  openGraph: {
    title: "체납 세금, 나눠서 낼 수 있을까? 분할납부 조건과 신청 방법",
    description: "1,000만원 초과 세금, 홈택스에서 분할납부 신청하면 가산세 없이 2개월 여유.",
    url: "https://www.jjyu.co.kr/w/체납-세금-분할-납부",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

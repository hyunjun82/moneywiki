import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보안카드 잃어버렸다면? 재발급 방법과 OTP 전환까지 | 머니위키",
  description: "신분증 하나로 은행 영업점에서 5분 만에 보안카드 재발급 가능해요. 대부분 무료이고, 분실 시 앱이나 고객센터로 즉시 신고하세요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/보안카드-재발급",
  },
  openGraph: {
    title: "보안카드 잃어버렸다면? 재발급 방법과 OTP 전환까지",
    description: "신분증 하나로 영업점 즉시 재발급. 대부분 무료, 분실 시 즉시 신고.",
    url: "https://www.jjyu.co.kr/w/보안카드-재발급",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

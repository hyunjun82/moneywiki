import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "지방소득세 따로 신고해야 하나요? 위택스 납부 방법 | 머니위키",
  description: "소득세의 10%를 위택스에서 별도로 신고·납부해야 해요. 홈택스 연동 절차, 가산세, 환급 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/지방소득세-신고-납부" },
  openGraph: {
    title: "지방소득세 따로 신고해야 하나요? 위택스 납부 방법 | 머니위키",
    description: "소득세의 10%를 위택스에서 별도로 신고·납부해야 해요. 홈택스 연동 절차, 가산세, 환급 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/지방소득세-신고-납부",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "공동인증서 재발급 방법, PC·모바일 5분 완료 | 머니위키",
  description: "공동인증서 재발급 경로, PC·모바일 발급 절차, 다른 기기로 복사하는 법, 금융인증서와 차이를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공동인증서-재발급" },
  openGraph: {
    title: "공동인증서 재발급 방법, PC·모바일 5분 완료 | 머니위키",
    description: "공동인증서 재발급 경로, PC·모바일 발급 절차, 다른 기기로 복사하는 법을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/공동인증서-재발급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

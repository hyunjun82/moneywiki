import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "스미싱 차단 방법, 소액결제 차단부터 피해 신고까지 | 머니위키",
  description: "스미싱 문자 피해를 막는 가장 확실한 방법은 소액결제 원천 차단이에요. AI 차단 서비스, 보안 설정, 피해 시 신고 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/스미싱-차단" },
  openGraph: {
    title: "스미싱 차단 방법, 소액결제 차단부터 피해 신고까지 | 머니위키",
    description: "스미싱 문자 피해를 막는 가장 확실한 방법은 소액결제 원천 차단이에요. AI 차단 서비스, 보안 설정, 피해 시 신고 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/스미싱-차단",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

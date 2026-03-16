import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 갑자기 끊겼다면? 중단 사유와 대처 방법 | 머니위키",
  description: "실업급여가 중단되는 사유와 다시 받는 방법을 정리했어요. 취업, 해외출국, 실업인정 불참, 부정수급 환수까지 한 번에 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-중단" },
  openGraph: {
    title: "실업급여 갑자기 끊겼다면? 중단 사유와 대처 방법 | 머니위키",
    description: "실업급여가 중단되는 사유와 다시 받는 방법을 정리했어요. 취업, 해외출국, 실업인정 불참, 부정수급 환수까지 한 번에 확인하세요.",
    url: "https://www.jjyu.co.kr/w/실업급여-중단",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

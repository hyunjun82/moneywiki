import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 재취업활동 인정 기준과 증빙 방법 | 머니위키",
  description: "실업급여 수급 중 인정되는 구직활동과 인정 안 되는 활동을 정리했어요. 실업인정 횟수 기준과 증빙 방법까지 한 번에 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-재취업활동-인정" },
  openGraph: {
    title: "실업급여 재취업활동 인정 기준과 증빙 방법 | 머니위키",
    description: "실업급여 수급 중 인정되는 구직활동과 인정 안 되는 활동을 정리했어요. 실업인정 횟수 기준과 증빙 방법까지 한 번에 확인하세요.",
    url: "https://www.jjyu.co.kr/w/실업급여-재취업활동-인정",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

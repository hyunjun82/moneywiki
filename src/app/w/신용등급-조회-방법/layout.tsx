import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "신용등급 조회 방법 무료 2026, NICE·KCB 확인하는 곳 | 머니위키",
  description: "NICE 지키미와 올크레딧에서 무료로 신용점수를 조회할 수 있어요. 본인 조회는 점수에 영향 없고, 토스 앱에서 무제한 무료로 볼 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/신용등급-조회-방법" },
  openGraph: {
    title: "신용등급 조회 방법 무료 2026, NICE·KCB 확인하는 곳 | 머니위키",
    description: "NICE 지키미와 올크레딧에서 무료로 신용점수를 조회할 수 있어요. 본인 조회는 점수에 영향 없고, 토스 앱에서 무제한 무료로 볼 수 있어요.",
    url: "https://www.jjyu.co.kr/w/신용등급-조회-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

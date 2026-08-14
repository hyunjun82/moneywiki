import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "금융인증서 발급 방법 — 공동인증서와 차이, 5분이면 완료",
  description: "은행 앱에서 5분이면 무료 발급돼요. 클라우드 저장이라 기기 이동 불필요하고 유효기간 3년이에요. 공동인증서와 차이도 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/금융-인증서-발급" },
  openGraph: {
    title: "금융인증서 발급 방법 — 공동인증서와 차이, 5분이면 완료 | 머니위키",
    description: "은행 앱에서 5분이면 무료 발급돼요. 클라우드 저장이라 기기 이동 불필요하고 유효기간 3년이에요. 공동인증서와 차이도 정리했어요.",
    url: "https://www.jjyu.co.kr/w/금융-인증서-발급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

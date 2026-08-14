import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "공동인증서 재발급, 5분 안에 끝내는 방법",
  description: "공동인증서 분실·비밀번호 분실·포맷 후에도 재발급받을 수 있어요. 비대면 발급자는 온라인 5분, 서류 제출자는 영업점 방문이에요. 단계별 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공동인증서-재발급" },
  openGraph: {
    title: "공동인증서 재발급, 5분 안에 끝내는 방법 | 머니위키",
    description: "공동인증서 분실·비밀번호 분실·포맷 후에도 재발급받을 수 있어요. 비대면 발급자는 온라인 5분, 서류 제출자는 영업점 방문이에요.",
    url: "https://www.jjyu.co.kr/w/공동인증서-재발급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

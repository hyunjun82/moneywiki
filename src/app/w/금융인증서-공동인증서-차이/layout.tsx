import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "금융인증서 공동인증서 차이, 어떤 걸 써야 할까?",
  description: "금융인증서는 클라우드 저장·3년 자동갱신·은행 전용. 공동인증서는 기기 저장·1년 갱신·공공기관까지 사용. 두 인증서 비교와 발급 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/금융인증서-공동인증서-차이" },
  openGraph: {
    title: "금융인증서 공동인증서 차이, 어떤 걸 써야 할까? | 머니위키",
    description: "금융인증서는 클라우드 저장·3년 자동갱신·은행 전용. 공동인증서는 기기 저장·1년 갱신·공공기관까지 사용. 두 인증서 비교와 발급 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/금융인증서-공동인증서-차이",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "권고사직 실업급여, 어떻게 신청해? 절차와 필요 서류",
  description: "권고사직은 비자발적 퇴사라서 실업급여를 받을 수 있죠. 워크넷 구직등록부터 고용센터 신청까지 절차와 필요 서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/권고사직-실업급여-신청-방법" },
  openGraph: {
    title: "권고사직 실업급여, 어떻게 신청해? 절차와 필요 서류 | 머니위키",
    description: "권고사직은 비자발적 퇴사라서 실업급여를 받을 수 있죠. 워크넷 구직등록부터 고용센터 신청까지 절차와 필요 서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/권고사직-실업급여-신청-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 신청, 뭘 챙겨야 할까? 필요 서류 체크리스트",
  description: "실업급여 신청할 때 필요한 준비물을 정리했어요. 신분증, 통장 사본, 증명사진 등 고용센터 방문 전 챙겨야 할 서류와 워크넷 구직등록 방법까지 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-신청-준비물-목록" },
  openGraph: {
    title: "실업급여 신청, 뭘 챙겨야 할까? 필요 서류 체크리스트 | 머니위키",
    description: "실업급여 신청할 때 필요한 준비물을 정리했어요. 신분증, 통장 사본, 증명사진 등 고용센터 방문 전 챙겨야 할 서류와 워크넷 구직등록 방법까지 안내해요.",
    url: "https://www.jjyu.co.kr/w/실업급여-신청-준비물-목록",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

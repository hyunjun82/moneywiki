import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 구비서류, 뭘 챙겨야 할까? | 머니위키",
  description: "실업급여 신청 필수 서류는 신분증, 통장 사본, 워크넷 확인증 3가지예요. 이직확인서 확인 방법과 준비 순서를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/실업급여-구비서류",
  },
  openGraph: {
    title: "실업급여 구비서류, 뭘 챙겨야 할까?",
    description: "필수 3가지만 챙기면 돼요. 서류 빠뜨리면 헛걸음이니까 미리 확인하세요.",
    url: "https://www.jjyu.co.kr/w/실업급여-구비서류",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

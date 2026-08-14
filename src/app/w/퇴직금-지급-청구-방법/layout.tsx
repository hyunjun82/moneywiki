import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지급 청구 방법, 직접 요청할 수 있나요?",
  description: "퇴직금을 직접 청구하는 방법과 필요한 서류를 정리했어요. 회사가 지급을 거부할 때 내용증명, 노동청 신고까지 단계별로 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지급-청구-방법" },
  openGraph: {
    title: "퇴직금 지급 청구 방법, 직접 요청할 수 있나요? | 머니위키",
    description: "퇴직금을 직접 청구하는 방법과 필요한 서류를 정리했어요. 회사가 지급을 거부할 때 내용증명, 노동청 신고까지 단계별로 안내해요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지급-청구-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

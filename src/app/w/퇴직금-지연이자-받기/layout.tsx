import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지연이자, 어떻게 받나요? 내용증명부터 노동청 신고까지 | 머니위키",
  description: "퇴직금을 14일 안에 못 받았다면 연 20% 지연이자를 청구할 수 있어요. 내용증명, 노동청 진정, 형사 고발까지 단계별 청구 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지연이자-받기" },
  openGraph: {
    title: "퇴직금 지연이자, 어떻게 받나요? 내용증명부터 노동청 신고까지 | 머니위키",
    description: "퇴직금을 14일 안에 못 받았다면 연 20% 지연이자를 청구할 수 있어요. 내용증명, 노동청 진정, 형사 고발까지 단계별 청구 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지연이자-받기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

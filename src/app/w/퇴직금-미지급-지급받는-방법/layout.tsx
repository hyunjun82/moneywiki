import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 미지급, 지금 당장 받을 수 있는 방법은?",
  description: "퇴직금을 못 받았다면 내용증명, 노동청 신고, 소액체당금, 지급명령까지 단계별로 시도할 수 있어요. 가장 빠른 방법부터 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-미지급-지급받는-방법" },
  openGraph: {
    title: "퇴직금 미지급, 지금 당장 받을 수 있는 방법은? | 머니위키",
    description: "퇴직금을 못 받았다면 내용증명, 노동청 신고, 소액체당금, 지급명령까지 단계별로 시도할 수 있어요. 가장 빠른 방법부터 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-미지급-지급받는-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

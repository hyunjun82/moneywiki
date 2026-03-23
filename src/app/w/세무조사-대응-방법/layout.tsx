import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "세무조사 통지 받았다면? 준비사항부터 대응 전략까지 | 머니위키",
  description: "세무조사 사전통지를 받으면 20일 안에 준비해야 해요. 조사 유형별 대응 전략, 준비 서류, 불복 절차까지 단계별로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/세무조사-대응-방법" },
  openGraph: {
    title: "세무조사 통지 받았다면? 준비사항부터 대응 전략까지 | 머니위키",
    description: "세무조사 사전통지를 받으면 20일 안에 준비해야 해요. 조사 유형별 대응 전략, 준비 서류, 불복 절차까지 단계별로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/세무조사-대응-방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

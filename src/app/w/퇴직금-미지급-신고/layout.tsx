import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 미지급 신고, 어디에 어떻게 하나요? | 머니위키",
  description: "퇴직금을 못 받았다면 관할 노동청에 임금체불 진정을 넣을 수 있어요. 신고 장소, 준비 서류, 진행 절차, 결과까지 순서대로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-미지급-신고" },
  openGraph: {
    title: "퇴직금 미지급 신고, 어디에 어떻게 하나요? | 머니위키",
    description: "퇴직금을 못 받았다면 관할 노동청에 임금체불 진정을 넣을 수 있어요. 신고 장소, 준비 서류, 진행 절차, 결과까지 순서대로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-미지급-신고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

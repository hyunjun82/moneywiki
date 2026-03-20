import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금을 못 받았는데 어디에 신고하나요? 내용증명부터 노동청 진정까지 | 머니위키",
  description: "퇴직 후 14일 지나도 퇴직금이 안 들어왔다면 고용노동부에 임금체불 진정을 넣을 수 있어요. 내용증명, 진정 접수, 지연이자 청구까지 단계별로 다뤄요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-미지급-신고" },
  openGraph: {
    title: "퇴직금을 못 받았는데 어디에 신고하나요? 내용증명부터 노동청 진정까지 | 머니위키",
    description: "퇴직 후 14일 지나도 퇴직금이 안 들어왔다면 고용노동부에 임금체불 진정을 넣을 수 있어요. 내용증명, 진정 접수, 지연이자 청구까지 단계별로 다뤄요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-미지급-신고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

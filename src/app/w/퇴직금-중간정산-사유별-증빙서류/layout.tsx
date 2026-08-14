import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 중간정산 사유별 증빙서류, 뭘 준비해야 하나요?",
  description: "퇴직금 중간정산 사유별로 필요한 증빙서류가 달라요. 주택 구입, 질병 치료, 천재지변 등 사유별 서류를 구체적으로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중간정산-사유별-증빙서류" },
  openGraph: {
    title: "퇴직금 중간정산 사유별 증빙서류, 뭘 준비해야 하나요? | 머니위키",
    description: "퇴직금 중간정산 사유별로 필요한 증빙서류가 달라요. 주택 구입, 질병 치료, 천재지변 등 사유별 서류를 구체적으로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중간정산-사유별-증빙서류",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 당일 못 가면? 대리인 입찰 서류와 위임장 작성법 | 머니위키",
  description: "경매 입찰 대리인은 성인이면 누구나 가능해요. 위임장(인감도장), 인감증명서, 보증금(본인 명의)이 핵심 서류이고 하나라도 빠지면 입찰 불가예요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/경매-입찰-대리인-신청-서류",
  },
  openGraph: {
    title: "경매 대리인 입찰 서류와 위임장 작성법",
    description: "위임장 인감도장 + 인감증명서 + 보증금 본인 명의. 필요 서류 6종.",
    url: "https://www.jjyu.co.kr/w/경매-입찰-대리인-신청-서류",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 입찰 대리인 참여, 친구도 되나? 위임장 작성법과 필요 서류",
  description: "경매 입찰 당일 못 가면 대리인을 세울 수 있어요. 위임장에 인감도장 찍고, 인감증명서와 대리인 신분증만 챙기면 누구든 대신 입찰 가능하죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경매-입찰-대리인-위임장-친구-참여" },
  openGraph: {
    title: "경매 입찰 대리인 참여, 친구도 되나? 위임장 작성법과 필요 서류 | 머니위키",
    description: "경매 입찰 당일 못 가면 대리인을 세울 수 있어요. 위임장에 인감도장 찍고, 인감증명서와 대리인 신분증만 챙기면 누구든 대신 입찰 가능하죠.",
    url: "https://www.jjyu.co.kr/w/경매-입찰-대리인-위임장-친구-참여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

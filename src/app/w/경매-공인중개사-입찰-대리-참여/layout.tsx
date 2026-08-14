import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "경매 공인중개사 대리 입찰 참여 조건",
  description: "경매장 가기 힘들면 공인중개사한테 맡겨도 되나요? 대리 입찰 자격부터 위임장 작성까지 쉽게 알려드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경매-공인중개사-입찰-대리-참여" },
  openGraph: { title: "경매 공인중개사 대리 입찰 참여 조건", description: "경매장 가기 힘들면 공인중개사한테 맡겨도 되나요? 대리 입찰 자격부터 위임장 작성까지 쉽게 알려드릴게요.", url: "https://www.jjyu.co.kr/w/경매-공인중개사-입찰-대리-참여", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

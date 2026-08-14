import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "경매정보 조회 사이트: 대법원부터 민간 플랫폼 7개 총정리",
  description: "경매 정보 어디서 봐야 하는지 궁금하시죠? 공식 사이트부터 무료 플랫폼까지 한곳에 정리했어요.",
  openGraph: { title: "경매정보 조회 사이트: 대법원부터 민간 플랫폼 7개 총정리", description: "경매 정보 어디서 봐야 하는지 궁금하시죠? 공식 사이트부터 무료 플랫폼까지 한곳에 정리했어요.", url: "https://jjyu.co.kr/w/경매정보-조회-사이트" },
  alternates: { canonical: "https://jjyu.co.kr/w/경매정보-조회-사이트" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

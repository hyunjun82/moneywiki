import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "상가건물 경매 확인사항 체크리스트 권리분석",
  description: "상가건물 경매에 참가하려는데 어떤 사항을 확인해야 하는지 막막하신가요? 필수 체크리스트와 확인 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상가건물-경매-확인사항-체크리스트" },
  openGraph: {
    title: "상가건물 경매 확인사항 체크리스트 권리분석",
    description: "상가건물 경매에 참가하려는데 어떤 사항을 확인해야 하는지 막막하신가요? 필수 체크리스트와 확인 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/상가건물-경매-확인사항-체크리스트",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

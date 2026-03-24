import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임차인 경매 보증금 반환 대항력 배당 | 머니위키",
  description: "전세 살던 집이 경매로 넘어갔다고요? 보증금 돌려받을 수 있는 방법과 대항력, 배당 절차를 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임차인-경매-보증금-반환-대항력" },
  openGraph: {
    title: "임차인 경매 보증금 반환 대항력 배당",
    description: "전세 살던 집이 경매로 넘어갔다고요? 보증금 돌려받을 수 있는 방법과 대항력, 배당 절차를 알려드려요.",
    url: "https://www.jjyu.co.kr/w/임차인-경매-보증금-반환-대항력",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

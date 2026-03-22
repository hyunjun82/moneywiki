import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "상가가 경매로 넘어갔다면? 서울 임차보증금 회수 방법",
  description: "상가 경매 시 우선변제권과 최우선변제권 요건을 확인하세요. 서울 소액임차인은 6,500만원 이하, 최우선변제 2,200만원까지 가능해요.",
  openGraph: {
    title: "상가가 경매로 넘어갔다면? 서울 임차보증금 회수 방법",
    description: "상가 경매 시 우선변제권과 최우선변제권 요건을 확인하세요. 서울 소액임차인은 6,500만원 이하, 최우선변제 2,200만원까지 가능해요.",
    type: "article",
  },
  alternates: { canonical: "/w/서울-상가-경매-임차보증금-회수" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

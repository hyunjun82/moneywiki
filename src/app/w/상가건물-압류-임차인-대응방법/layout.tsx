import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "상가건물 압류 임차인 대응방법 | 머니위키",
  description: "상가건물 임차 중 건물이 압류되었다는 통지를 받았다면, 어떻게 대응해야 보증금을 지킬 수 있을까요?",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상가건물-압류-임차인-대응방법" },
  openGraph: {
    title: "상가건물 압류 임차인 대응방법",
    description: "상가건물 임차 중 건물이 압류되었다는 통지를 받았다면, 어떻게 대응해야 보증금을 지킬 수 있을까요?",
    url: "https://www.jjyu.co.kr/w/상가건물-압류-임차인-대응방법",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "차용증 없이 빌려준 돈 받기 — 통장 이체 증거로 소송하는 방법",
  description: "차용증 없어도 통장 이체 내역과 카톡 증거로 소송 가능해요. 민법 제598조에 따라 구두 대여도 인정돼요. 내용증명부터 소액사건 소송, 강제집행까지 5단계로 안내해요.",
  openGraph: {
    title: "차용증 없이 빌려준 돈 받기 — 통장 이체 증거로 소송하는 방법",
    description: "차용증 없어도 통장 이체 내역과 카톡 증거로 소송 가능해요. 민법 제598조에 따라 구두 대여도 인정돼요. 내용증명부터 소액사건 소송, 강제집행까지 5단계로 안내해요.",
    type: "article",
  },
  alternates: {
    canonical: "/w/차용증-없이-돈-받기-통장이체-증거",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

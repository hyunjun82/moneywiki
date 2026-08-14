import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계좌 개설 제한 해제, 한도제한계좌 푸는 방법",
  description: "새 통장 개설했는데 이체가 막혔나요? 한도제한계좌 해제 방법 3가지와 필요 서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계좌-개설-제한-해제" },
  openGraph: {
    title: "계좌 개설 제한 해제, 한도제한계좌 푸는 방법 | 머니위키",
    description: "새 통장 개설했는데 이체가 막혔나요? 한도제한계좌 해제 방법 3가지와 필요 서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/계좌-개설-제한-해제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

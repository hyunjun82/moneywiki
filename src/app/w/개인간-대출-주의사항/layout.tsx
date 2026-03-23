import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "개인간 대출 주의사항 | 머니위키",
  description: "친구한테 천만 원 빌려주기 전에 꼭 알아둬야 할 게 있거든요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/개인간-대출-주의사항" },
  openGraph: {
    title: "개인간 대출 주의사항",
    description: "친구한테 천만 원 빌려주기 전에 꼭 알아둬야 할 게 있거든요",
    url: "https://www.jjyu.co.kr/w/개인간-대출-주의사항",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

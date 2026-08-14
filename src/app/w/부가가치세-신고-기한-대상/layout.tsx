import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "부가가치세 신고 기한 대상 방법",
  description: "부가가치세 신고 기한은 언제인지, 신고 대상은 누구인지, 홈택스로 어떻게 신고하는지 쉽게 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부가가치세-신고-기한-대상" },
  openGraph: {
    title: "부가가치세 신고 기한 대상 방법",
    description: "부가가치세 신고 기한은 언제인지, 신고 대상은 누구인지, 홈택스로 어떻게 신고하는지 쉽게 알려드려요.",
    url: "https://www.jjyu.co.kr/w/부가가치세-신고-기한-대상",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

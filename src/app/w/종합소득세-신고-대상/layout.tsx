import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "종합소득세 신고 대상: 제외 대상과 미신고 불이익 | 머니위키",
  description: "종합소득세 꼭 신고해야 하는지 헷갈리시죠? 신고 대상 여부와 안 냈을 때 불이익을 알려드려요",
  openGraph: { title: "종합소득세 신고 대상: 제외 대상과 미신고 불이익 | 머니위키", description: "종합소득세 꼭 신고해야 하는지 헷갈리시죠? 신고 대상 여부와 안 냈을 때 불이익을 알려드려요", url: "https://www.jjyu.co.kr/w/종합소득세-신고-대상", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/종합소득세-신고-대상" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

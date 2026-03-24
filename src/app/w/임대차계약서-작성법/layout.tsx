import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임대차계약서 작성법 | 머니위키",
  description: "임대차계약서 작성 방법과 필수 기재 사항을 알아봅니다. 전세, 월세 계약서 양식과 특약사항 작성법을 정리합니다.",
  openGraph: { title: "임대차계약서 작성법 | 머니위키", description: "임대차계약서 작성 방법과 필수 기재 사항을 알아봅니다. 전세, 월세 계약서 양식과 특약사항 작성법을 정리합니다.", url: "https://www.jjyu.co.kr/w/임대차계약서-작성법", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/임대차계약서-작성법" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

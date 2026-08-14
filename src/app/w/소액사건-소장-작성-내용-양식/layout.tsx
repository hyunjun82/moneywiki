import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "소액사건 소장 작성: 필수 기재 사항 및 양식 작성법",
  description: "소액사건 소장을 어떻게 써야 할지 막막하시죠. 필수로 써야 할 내용부터 실제 양식 작성법까지 자세히 알려드려요.",
  openGraph: { title: "소액사건 소장 작성: 필수 기재 사항 및 양식 작성법 | 머니위키", description: "소액사건 소장을 어떻게 써야 할지 막막하시죠. 필수로 써야 할 내용부터 실제 양식 작성법까지 자세히 알려드려요.", url: "https://www.jjyu.co.kr/w/소액사건-소장-작성-내용-양식", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/소액사건-소장-작성-내용-양식" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

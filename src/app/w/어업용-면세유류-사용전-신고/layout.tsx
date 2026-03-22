import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "어업용 면세유류, 사용 전에 신고해야 하나요? 사전 신고 절차와 서류 | 머니위키",
  description: "어업용 면세유류는 사용 전에 관할 수협에 신고해야 해요. 미신고 시 면세 혜택이 취소돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/어업용-면세유류-사용전-신고" },
  openGraph: { title: "어업용 면세유류, 사용 전에 신고해야 하나요? 사전 신고 절차와 서류 | 머니위키", description: "어업용 면세유류는 사용 전에 관할 수협에 신고해야 해요. 미신고 시 면세 혜택이 취소돼요.", url: "https://www.jjyu.co.kr/w/어업용-면세유류-사용전-신고", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "도산등사실인정 신청 방법, 필요 서류와 체당금 수령",
  description: "회사가 사실상 도산했을 때 고용노동부에 신청하면 체당금(미지급 임금) 최대 1천만원 받을 수 있어요. 신청 절차와 서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/도산등사실인정-신청-방법-서류" },
  openGraph: { title: "도산등사실인정 신청 방법, 체당금 수령까지 | 머니위키", description: "회사가 사실상 도산했을 때 체당금 최대 1천만원. 신청 절차와 서류 정리.", url: "https://www.jjyu.co.kr/w/도산등사실인정-신청-방법-서류", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

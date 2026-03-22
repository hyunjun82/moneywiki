import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년일자리도약장려금 신청 조건과 최대 720만원 지원금 | 머니위키",
  description: "만 15~34세 4개월 이상 실업 청년이 중소기업에 취업 시 기업에 최대 720만원 지급. 신청 자격과 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년일자리도약장려금-신청-조건-지원금" },
  openGraph: {
    title: "청년일자리도약장려금 신청 조건과 최대 720만원 지원금 | 머니위키",
    description: "만 15~34세 4개월 이상 실업 청년이 중소기업에 취업 시 기업에 최대 720만원 지급. 신청 자격과 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/청년일자리도약장려금-신청-조건-지원금",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

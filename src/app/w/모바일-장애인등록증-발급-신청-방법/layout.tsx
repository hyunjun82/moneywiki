import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "모바일 장애인등록증 발급 신청 방법 | 머니위키",
  description: "2026년 1월 22일부터 스마트폰에 장애인등록증을 저장할 수 있어요. 행정복지센터에서 무료로 당일 발급받는 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/모바일-장애인등록증-발급-신청-방법",
  },
  openGraph: {
    title: "모바일 장애인등록증 발급 신청 방법",
    description: "신분증과 본인 명의 스마트폰만 있으면 당일 무료 발급이 돼요.",
    url: "https://www.jjyu.co.kr/w/모바일-장애인등록증-발급-신청-방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

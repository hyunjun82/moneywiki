import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세권 설정등기, 확정일자랑 뭐가 다를까? 비용·절차·효력 비교 | 머니위키",
  description: "전세권 설정등기는 경매 신청권까지 보장하는 강력한 물권이에요. 확정일자와의 차이, 비용, 절차를 비교해서 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/전세권-설정등기",
  },
  openGraph: {
    title: "전세권 설정등기, 확정일자랑 뭐가 다를까? 비용·절차·효력 비교",
    description: "전세권 설정등기와 확정일자의 차이. 비용과 절차 비교.",
    url: "https://www.jjyu.co.kr/w/전세권-설정등기",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

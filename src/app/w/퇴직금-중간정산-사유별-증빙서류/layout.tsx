import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 중간정산, 서류가 없으면 거부돼요 | 머니위키",
  description: "퇴직금 중간정산 사유별 증빙서류와 발급처를 정리했어요. 주택 구입·임차, 의료비, 파산·개인회생, 임금피크제 등 7가지 사유마다 필요한 서류가 달라요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중간정산-사유별-증빙서류" },
  openGraph: {
    title: "퇴직금 중간정산, 서류가 없으면 거부돼요 | 머니위키",
    description: "퇴직금 중간정산 사유별 증빙서류와 발급처를 정리했어요. 주택 구입·임차, 의료비, 파산·개인회생, 임금피크제 등 7가지 사유마다 필요한 서류가 달라요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중간정산-사유별-증빙서류",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "정비구역에서 건물 짓고 싶다면? 건축 허가 절차와 주의사항",
  description: "재건축 정비구역에서는 구청장 허가 없이 건축하면 철거당해요. 허가 대상, 신청 절차, 무허가 시 제재까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/재건축-정비구역-건축-허가",
  },
  openGraph: {
    title: "정비구역에서 건물 짓고 싶다면? 건축 허가 절차와 주의사항",
    description: "정비구역 건축 허가 대상, 신청 절차, 무허가 제재 정리.",
    url: "https://www.jjyu.co.kr/w/재건축-정비구역-건축-허가",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

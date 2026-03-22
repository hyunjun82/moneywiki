import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "농지전용허가 받으면 바로 공사해도 될까? 착공 전 신고 절차 | 머니위키",
  description: "농지전용허가 후 부담금 납부와 착공신고를 해야 공사를 시작할 수 있어요. 불법전용 시 5년 징역·토지가액 벌금. 절차와 처벌 기준을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/농지전용허가-형질변경-신고-착공-시기",
  },
  openGraph: {
    title: "농지전용허가 받으면 바로 공사해도 될까? 착공 전 신고 절차",
    description: "허가→부담금→착공신고→공사 순서 필수. 무단 공사 시 5년 징역 또는 토지가액 벌금.",
    url: "https://www.jjyu.co.kr/w/농지전용허가-형질변경-신고-착공-시기",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

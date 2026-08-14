import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "건축법 위반 용도변경 제재, 이행강제금·벌금 기준",
  description: "무단 용도변경 시 이행강제금 시가표준액 10% 매년 부과. 2년 이하 징역 또는 1억원 벌금. 적법한 용도변경 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건축법-위반-용도변경-제재" },
  openGraph: { title: "건축법 위반 용도변경 제재 | 머니위키", description: "무단 용도변경 시 이행강제금 시가표준액 10% 매년 부과.", url: "https://www.jjyu.co.kr/w/건축법-위반-용도변경-제재", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

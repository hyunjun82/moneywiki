import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "외국인근로자 재입국 취업 특례: 외국인근로자 재입국 제도 및 신청 조건 | 머니위키",
  description: "성실하게 4년 10개월 근무한 외국인근로자는 3개월 후 재입국해서 다시 일할 수 있어요. 재입국 특례 조건과 절차를 알려드릴게요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/외국인근로자-재입국-취업-특례" },
  openGraph: { title: "외국인근로자 재입국 취업 특례: 외국인근로자 재입국 제도 및 신청 조건 | 머니위키", description: "성실하게 4년 10개월 근무한 외국인근로자는 3개월 후 재입국해서 다시 일할 수 있어요. 재입국 특례 조건과 절차를 알려드릴게요", url: "https://www.jjyu.co.kr/w/외국인근로자-재입국-취업-특례", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

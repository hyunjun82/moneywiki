import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "외국인근로자 산재보험 적용 범위 | 체류자격 무관 신청 방법",
  description: "외국인근로자는 체류자격과 무관하게 산재보험 받는다는 사실 알고 계셨나요? 신청 방법부터 귀국 후 절차까지 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/외국인근로자-산재보험-받기" },
  openGraph: {
    title: "외국인근로자 산재보험 적용 범위 | 체류자격 무관 신청 방법",
    description: "외국인근로자는 체류자격과 무관하게 산재보험 받는다는 사실 알고 계셨나요? 신청 방법부터 귀국 후 절차까지 알려드려요.",
    url: "https://www.jjyu.co.kr/w/외국인근로자-산재보험-받기",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

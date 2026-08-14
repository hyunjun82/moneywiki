import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "건설현장 일용직 산재보험 적용 기준과 신청법",
  description: "건설 일용직은 1일 근무부터 산재보험 적용돼요. 공사금액 2천만원 이상 현장이면 의무 가입이고, 치료비 전액을 보상받을 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/산재보험-건설현장-일용근로자-적용",
  },
  openGraph: {
    title: "건설현장 일용직 산재보험 적용 기준과 신청법",
    description: "하루만 일해도 산재보험 적용. 적용 기준과 신청 절차.",
    url: "https://www.jjyu.co.kr/w/산재보험-건설현장-일용근로자-적용",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

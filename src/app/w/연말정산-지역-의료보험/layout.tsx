import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "지역 건강보험료, 연말정산에서 공제되나요? 직장·지역가입자별 정리",
  description: "지역가입자 건강보험료는 연말정산이 아닌 5월 종합소득세 신고 때 전액 소득공제돼요. 직장 다니다 퇴사한 경우 두 곳에서 각각 공제받을 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-지역-의료보험",
  },
  openGraph: {
    title: "지역가입자 건강보험료 공제, 연말정산 아닌 종합소득세에서",
    description: "프리랜서·개인사업자는 5월 종합소득세 신고 시 전액 소득공제.",
    url: "https://www.jjyu.co.kr/w/연말정산-지역-의료보험",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

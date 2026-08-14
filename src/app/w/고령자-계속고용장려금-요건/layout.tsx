import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "정년 넘긴 직원 계속 고용하면 돈 준다고? 계속고용장려금 요건과 신청 방법",
  description: "정년 이후 고령자를 계속 고용하면 1인당 월 30~40만원, 최대 3년간 지원해요. 중소·중견기업 사업주가 고용센터에 신청하는 제도예요. 재고용 방식이 77%로 가장 많아요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/고령자-계속고용장려금-요건",
  },
  openGraph: {
    title: "정년 넘긴 직원 계속 고용하면 돈 준다고? 계속고용장려금 요건과 신청 방법",
    description: "월 30~40만원, 최대 3년 지원. 중소·중견기업 대상. 요건과 신청 절차.",
    url: "https://www.jjyu.co.kr/w/고령자-계속고용장려금-요건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고인의 금융재산, 어떻게 조회하나요? 상속인 금융거래 조회 신청 방법 | 머니위키",
  description: "상속인 금융거래 조회를 신청하면 고인의 은행·보험·증권·카드 거래를 한 번에 확인할 수 있어요. 은행 영업점이나 정부24에서 무료 신청, 15~20일 후 결과 확인 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/금융거래정보-조회-신청",
  },
  openGraph: {
    title: "고인의 금융재산, 어떻게 조회하나요? 상속인 금융거래 조회 신청 방법",
    description: "전 금융권 한 번에 조회. 은행·정부24에서 무료 신청.",
    url: "https://www.jjyu.co.kr/w/금융거래정보-조회-신청",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

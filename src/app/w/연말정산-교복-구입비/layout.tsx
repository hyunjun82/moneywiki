import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 교복비, 얼마까지 공제되나요? 1인당 50만원 한도와 신청 방법",
  description: "중고등학생 교복비는 1인당 연 50만원 한도로 15% 세액공제돼요. 체육복 포함, 교육비 300만원 한도와 별도. 간소화서비스에서 자동 조회 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-교복-구입비",
  },
  openGraph: {
    title: "연말정산 교복비, 얼마까지 공제되나요? 1인당 50만원 한도와 신청 방법",
    description: "1인당 50만원 한도, 15% 세액공제. 체육복 포함, 교육비와 별도.",
    url: "https://www.jjyu.co.kr/w/연말정산-교복-구입비",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

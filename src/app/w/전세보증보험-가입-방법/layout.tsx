import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세보증보험 가입 방법, 조건과 보험료까지",
  description: "전입신고·확정일자 받고 계약 후 3개월 이내에 HUG에 신청하면 돼요. 보험료는 2년 계약 기준 약 50만원이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세보증보험-가입-방법" },
  openGraph: {
    title: "전세보증보험 가입 방법, 조건과 보험료까지 | 머니위키",
    description: "전입신고·확정일자 받고 계약 후 3개월 이내에 HUG에 신청하면 돼요. 보험료는 2년 계약 기준 약 50만원이에요.",
    url: "https://www.jjyu.co.kr/w/전세보증보험-가입-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

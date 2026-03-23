import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "장애인 특수교육비, 한도 없이 공제돼요 대상 비용과 신청 서류 정리 | 머니위키",
  description: "장애인 특수교육비는 한도 없이 전액 15% 세액공제돼요. 재활교육비 1,200만원이면 180만원 환급. 인가 시설 기준과 필요 서류를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-장애인-특수교육비",
  },
  openGraph: {
    title: "장애인 특수교육비, 한도 없이 공제돼요 대상 비용과 신청 서류 정리",
    description: "재활교육비 한도 없이 15% 세액공제. 인가 시설 기준과 서류.",
    url: "https://www.jjyu.co.kr/w/연말정산-장애인-특수교육비",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

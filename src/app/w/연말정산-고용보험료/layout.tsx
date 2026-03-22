import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고용보험료도 연말정산에서 공제될까? 요율 0.9%와 절세 효과 | 머니위키",
  description: "고용보험료 본인 부담분 0.9%는 한도 없이 전액 소득공제돼요. 간소화서비스에서 자동 반영되고 4대보험 합치면 연간 349만원 소득공제 효과.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-고용보험료",
  },
  openGraph: {
    title: "고용보험료도 연말정산에서 공제될까? 요율 0.9%와 절세 효과",
    description: "본인 부담 0.9% 전액 소득공제. 한도 없고 자동 반영. 4대보험 합산 절세 효과까지.",
    url: "https://www.jjyu.co.kr/w/연말정산-고용보험료",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

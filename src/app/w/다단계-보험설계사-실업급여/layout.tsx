import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "다단계 보험설계사 실업급여 수급 가능 여부와 신청법",
  description: "보험설계사는 2021년부터 고용보험이 적용돼요. 고용보험 180일 이상이고 비자발적 이직이면 실업급여를 받을 수 있어요.",
  openGraph: { title: "다단계 보험설계사 실업급여 수급 가능 여부와 신청법 | 머니위키", description: "특수형태근로자 실업급여 신청 방법이에요.", url: "https://www.jjyu.co.kr/w/다단계-보험설계사-실업급여", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/다단계-보험설계사-실업급여" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }

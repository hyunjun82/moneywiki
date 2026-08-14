import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업인정 면접·입사 준비 출석 불가 인정 방법",
  description: "면접 때문에 실업인정일에 못 가도 구직활동으로 인정받을 수 있어요. 면접 확인서 제출하면 실업급여 정상 지급받는 방법 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업인정-입사-면접-출석-불가" },
  openGraph: { title: "실업인정 면접·입사 준비 출석 불가 인정 방법", description: "면접 때문에 실업인정일에 못 가도 구직활동으로 인정받을 수 있어요. 면접 확인서 제출하면 실업급여 정상 지급받는 방법 알려드려요.", url: "https://www.jjyu.co.kr/w/실업인정-입사-면접-출석-불가", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

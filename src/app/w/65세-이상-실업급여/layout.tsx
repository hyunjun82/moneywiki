import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "65세 이상 실업급여 받을 수 있을까? 동일 사업장 계속 고용 조건 | 머니위키",
  description: "65세 이후에도 동일 사업장에서 계속 근무했다면 실업급여를 받을 수 있어요. 수급 조건과 사례별 판단 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/65세-이상-실업급여" },
  openGraph: {
    title: "65세 이상 실업급여 받을 수 있을까? 동일 사업장 계속 고용 조건 | 머니위키",
    description: "65세 이후에도 동일 사업장에서 계속 근무했다면 실업급여를 받을 수 있어요. 수급 조건과 사례별 판단 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/65세-이상-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "취업규칙, 어떻게 만들고 신고하나? 작성부터 변경·신고 절차까지 | 머니위키",
  description: "10인 이상 사업장 필수. 취업규칙 필수 기재 사항 7가지, 변경 시 동의 기준, 노동청 신고 방법과 과태료 500만원 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/취업규칙-작성-변경-신고" },
  openGraph: {
    title: "취업규칙, 어떻게 만들고 신고하나? 작성부터 변경·신고 절차까지 | 머니위키",
    description: "10인 이상 사업장 필수. 취업규칙 필수 기재 사항 7가지, 변경 시 동의 기준, 노동청 신고 방법과 과태료 500만원 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/취업규칙-작성-변경-신고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

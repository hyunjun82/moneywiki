import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "5인 미만 사업장 퇴직금, 정말 안 줘도 되나요? | 머니위키",
  description: "5인 미만 사업장이라도 퇴직금은 무조건 지급해야 해요. 2010년 12월 이후 근로자퇴직급여보장법이 전면 적용되고 있죠. 기준과 청구 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지급-기준-5인미만" },
  openGraph: {
    title: "5인 미만 사업장 퇴직금, 정말 안 줘도 되나요? | 머니위키",
    description: "5인 미만 사업장이라도 퇴직금은 무조건 지급해야 해요. 2010년 12월 이후 근로자퇴직급여보장법이 전면 적용되고 있죠. 기준과 청구 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지급-기준-5인미만",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

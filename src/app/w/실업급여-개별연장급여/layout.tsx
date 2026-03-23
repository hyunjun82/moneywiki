import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 개별연장급여, 최대 60일 더 받는 방법 | 머니위키",
  description: "구직급여 기간이 끝나도 개별연장급여로 최대 60일을 추가 수급할 수 있어요. 기본 급여의 70%가 지급되고 고용센터에서 신청해요.",
  openGraph: {
    title: "실업급여 개별연장급여, 최대 60일 더 받는 방법 | 머니위키",
    description: "개별연장급여 조건, 금액, 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-개별연장급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-개별연장급여" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

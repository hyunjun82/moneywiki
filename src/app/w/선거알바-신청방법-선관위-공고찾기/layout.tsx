import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "선거 알바 어디서 신청할까? 선관위 공고 찾는 법 | 머니위키",
  description: "선거 알바는 각 시/도/구 선관위 홈페이지에서 신청해요. 공고 확인 방법과 접수 절차를 단계별로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/선거알바-신청방법-선관위-공고찾기" },
  openGraph: {
    title: "선거 알바 어디서 신청할까? 선관위 공고 찾는 법 | 머니위키",
    description: "선거 알바는 각 시/도/구 선관위 홈페이지에서 신청해요. 공고 확인 방법과 접수 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/선거알바-신청방법-선관위-공고찾기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

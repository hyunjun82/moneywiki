import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "선거 알바 급여 언제 들어올까? 지급 시기와 입금 방법",
  description: "선거 알바 급여는 선거 후 1~2주 내에 본인 계좌로 입금돼요. 지급 시기와 계좌 등록 방법, 미지급 시 대처법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/선거알바-급여-지급시기-입금" },
  openGraph: {
    title: "선거 알바 급여 언제 들어올까? 지급 시기와 입금 방법 | 머니위키",
    description: "선거 알바 급여는 선거 후 1~2주 내에 본인 계좌로 입금돼요.",
    url: "https://www.jjyu.co.kr/w/선거알바-급여-지급시기-입금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

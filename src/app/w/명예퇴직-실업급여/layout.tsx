import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "명예퇴직 후 실업급여, 얼마 받을까? 수급 조건과 금액",
  description: "명예퇴직하면 실업급여를 받을 수 있어요. 이직확인서에 권고사직으로 기재되어야 하고, 명예퇴직금과 별도로 수급 가능해요. 조건과 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/명예퇴직-실업급여" },
  openGraph: {
    title: "명예퇴직 후 실업급여, 얼마 받을까? 수급 조건과 금액 | 머니위키",
    description: "명예퇴직하면 실업급여를 받을 수 있어요. 이직확인서에 권고사직으로 기재되어야 하고, 명예퇴직금과 별도로 수급 가능해요. 조건과 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/명예퇴직-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

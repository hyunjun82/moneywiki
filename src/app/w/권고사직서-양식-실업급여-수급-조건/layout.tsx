import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "권고사직서 양식과 실업급여 조건 | 머니위키",
  description: "권고사직 합의서 필수 기재사항 4가지와 실업급여 수급 조건. 서명 전 체크리스트부터 이직확인서 확인까지.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/권고사직서-양식-실업급여-수급-조건" },
  openGraph: {
    title: "권고사직서 양식과 실업급여 조건",
    description: "합의서 필수 4항목 + 실업급여 신청 절차 정리.",
    url: "https://www.jjyu.co.kr/w/권고사직서-양식-실업급여-수급-조건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

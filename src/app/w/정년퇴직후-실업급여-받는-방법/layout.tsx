import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "정년퇴직 후 실업급여 받을 수 있을까? 65세 기준과 수급기간 | 머니위키",
  description: "정년퇴직도 비자발적 퇴사라서 실업급여를 받을 수 있어요. 65세 이전 입사 조건, 수급기간 120~270일, 신청 4단계를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/정년퇴직후-실업급여-받는-방법" },
  openGraph: {
    title: "정년퇴직 후 실업급여 받을 수 있을까? 65세 기준과 수급기간 | 머니위키",
    description: "정년퇴직도 비자발적 퇴사라서 실업급여를 받을 수 있어요. 65세 이전 입사 조건, 수급기간 120~270일, 신청 4단계를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/정년퇴직후-실업급여-받는-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

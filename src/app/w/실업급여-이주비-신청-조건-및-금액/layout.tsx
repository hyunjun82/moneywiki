import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 이주비 신청 조건과 금액, 서류 준비부터 제출까지 | 머니위키",
  description: "취업 후 이사하면 이사비용을 실비로 받을 수 있어요. 이주비 수급 조건 3가지, 가족별 금액 기준, 필요 서류 5가지, 고용센터 제출 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-이주비-신청-조건-및-금액" },
  openGraph: {
    title: "실업급여 이주비 신청 조건과 금액, 서류 준비부터 제출까지 | 머니위키",
    description: "취업 후 이사하면 이사비용을 실비로 받을 수 있어요. 이주비 수급 조건 3가지, 가족별 금액 기준, 필요 서류 5가지, 고용센터 제출 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-이주비-신청-조건-및-금액",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

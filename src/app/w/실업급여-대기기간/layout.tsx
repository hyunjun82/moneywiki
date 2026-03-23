import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 대기기간 7일, 계산 방법과 예외 | 머니위키",
  description: "실업급여 신청 후 7일간 대기기간이 있어요. 실업 신고일부터 계산하고, 건설일용근로자는 예외예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-대기기간" },
  openGraph: {
    title: "실업급여 대기기간 7일, 계산 방법과 예외 | 머니위키",
    description: "실업급여 신청 후 7일간 대기기간이 있어요. 실업 신고일부터 계산하고, 건설일용근로자는 예외예요.",
    url: "https://www.jjyu.co.kr/w/실업급여-대기기간",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이직확인서 안 준다고? 거부 신고 방법과 과태료 기준",
  description: "회사에서 이직확인서를 안 해주면 고용센터에 신고하세요. 사업주 거부 시 과태료 부과와 직권 발급 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-이직확인서-거부" },
  openGraph: {
    title: "이직확인서 안 준다고? 거부 신고 방법과 과태료 기준 | 머니위키",
    description: "회사에서 이직확인서를 안 해주면 고용센터에 신고하세요. 사업주 거부 시 과태료 부과와 직권 발급 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-이직확인서-거부",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

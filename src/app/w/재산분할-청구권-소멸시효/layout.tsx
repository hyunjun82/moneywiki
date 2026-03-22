import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 후 재산분할, 언제까지 청구할 수 있을까? 2년 제척기간과 청구 방법 | 머니위키",
  description: "이혼 후 재산분할은 2년 안에 청구해야 해요. 협의이혼은 신고일, 재판이혼은 확정일부터 계산하는 제척기간과 가정법원 심판 청구 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재산분할-청구권-소멸시효" },
  openGraph: {
    title: "이혼 후 재산분할, 언제까지 청구할 수 있을까? 2년 제척기간과 청구 방법 | 머니위키",
    description: "이혼 후 재산분할은 2년 안에 청구해야 해요. 협의이혼은 신고일, 재판이혼은 확정일부터 계산하는 제척기간과 가정법원 심판 청구 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/재산분할-청구권-소멸시효",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

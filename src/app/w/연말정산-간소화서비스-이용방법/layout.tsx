import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 간소화서비스 이용 방법, PDF 제출까지 | 머니위키",
  description: "홈택스 연말정산 간소화서비스 조회 순서, 부양가족 동의 방법, 안경·교복 등 직접 챙길 항목, PDF 다운로드 후 제출까지 한 번에 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-간소화서비스-이용방법" },
  openGraph: {
    title: "연말정산 간소화서비스 이용 방법, PDF 제출까지 | 머니위키",
    description: "홈택스 연말정산 간소화서비스 조회 순서, 부양가족 동의 방법, 안경·교복 등 직접 챙길 항목, PDF 다운로드 후 제출까지 한 번에 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-간소화서비스-이용방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

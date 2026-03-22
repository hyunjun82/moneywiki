import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임금명세서, 회사가 꼭 줘야 하나요? 기재사항과 과태료 | 머니위키",
  description: "모든 사업장은 임금명세서를 교부할 의무가 있어요. 필수 기재 7항목과 미교부 시 500만원 과태료, 신고 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임금명세서-교부-의무-기재-내용" },
  openGraph: {
    title: "임금명세서, 회사가 꼭 줘야 하나요? 기재사항과 과태료 | 머니위키",
    description: "모든 사업장은 임금명세서를 교부할 의무가 있어요. 필수 기재 7항목과 미교부 시 500만원 과태료 안내.",
    url: "https://www.jjyu.co.kr/w/임금명세서-교부-의무-기재-내용",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

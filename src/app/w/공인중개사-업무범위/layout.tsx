import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "공인중개사 자격증으로 뭘 할 수 있나요? 업무 범위 완전 정리",
  description: "중개업무는 기본이고 임대관리, 분양대행, 경공매도 할 수 있어요. 2026년 신고 의무 강화 내용도 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공인중개사-업무범위" },
  openGraph: {
    title: "공인중개사 자격증으로 뭘 할 수 있나요? 업무 범위 완전 정리 | 머니위키",
    description: "중개업무는 기본이고 임대관리, 분양대행, 경공매도 할 수 있어요. 2026년 신고 의무 강화 내용도 정리했어요.",
    url: "https://www.jjyu.co.kr/w/공인중개사-업무범위",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

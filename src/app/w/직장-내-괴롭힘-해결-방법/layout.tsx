import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "직장 내 괴롭힘 해결 방법, 신고부터 보호 조치까지 | 머니위키",
  description: "직장 내 괴롭힘 신고 방법, 증거 확보 요령, 신고자 보호 규정을 정리했어요. 회사 내부 신고부터 고용노동부 직접 신고까지 단계별로 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/직장-내-괴롭힘-해결-방법" },
  openGraph: {
    title: "직장 내 괴롭힘 해결 방법, 신고부터 보호 조치까지 | 머니위키",
    description: "직장 내 괴롭힘 신고 방법과 증거 확보 요령, 신고자 보호 규정을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/직장-내-괴롭힘-해결-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

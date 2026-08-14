import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "금융사기 예방 방법 — 보이스피싱·스미싱 대처법",
  description: "금융기관은 전화로 비밀번호를 절대 묻지 않아요. 보이스피싱·파밍·스미싱 예방 수칙과 피해 시 신고 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/금융사기-예방-방법" },
  openGraph: {
    title: "금융사기 예방 방법 — 보이스피싱·스미싱 대처법 | 머니위키",
    description: "금융기관은 전화로 비밀번호를 절대 묻지 않아요. 보이스피싱·파밍·스미싱 예방 수칙과 피해 시 신고 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/금융사기-예방-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

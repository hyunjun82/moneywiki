import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "금융사기 예방법과 피해 시 대처법 2026 | 머니위키",
  description: "보이스피싱·스미싱·AI 음성사기 예방 수칙 6가지와 피해 시 112 신고·지급정지 절차를 정리했어요. 골든타임 30분이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/금융사기-예방" },
  openGraph: {
    title: "금융사기 예방법과 피해 시 대처법 2026 | 머니위키",
    description: "보이스피싱·스미싱·AI 음성사기 예방 수칙 6가지와 피해 시 112 신고·지급정지 절차를 정리했어요. 골든타임 30분이에요.",
    url: "https://www.jjyu.co.kr/w/금융사기-예방",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

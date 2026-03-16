import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "출퇴근 3시간 넘으면 실업급여? 정당 사유와 신청 방법 | 머니위키",
  description: "회사 이전, 결혼, 배우자 전근, 부양가족 동거로 출퇴근이 왕복 3시간 이상 걸리면 정당한 이직 사유로 실업급여를 받을 수 있습니다. 인정 기준과 증빙서류를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/출퇴근-곤란-실업급여" },
  openGraph: {
    title: "출퇴근 3시간 넘으면 실업급여? 정당 사유와 신청 방법 | 머니위키",
    description: "회사 이전, 결혼, 배우자 전근, 부양가족 동거로 출퇴근이 왕복 3시간 이상 걸리면 정당한 이직 사유로 실업급여를 받을 수 있습니다. 인정 기준과 증빙서류를 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/출퇴근-곤란-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

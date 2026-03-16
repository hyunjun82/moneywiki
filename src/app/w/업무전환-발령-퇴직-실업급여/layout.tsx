import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "업무전환 발령 거부 후 퇴직, 실업급여 될까? 인정 기준 | 머니위키",
  description: "채용 시 약속과 다른 업무로 발령받아 퇴직하면 정당한 이직 사유로 실업급여를 받을 수 있어요. 인정 기준, 증빙자료, 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/업무전환-발령-퇴직-실업급여" },
  openGraph: {
    title: "업무전환 발령 거부 후 퇴직, 실업급여 될까? 인정 기준 | 머니위키",
    description: "채용 시 약속과 다른 업무로 발령받아 퇴직하면 정당한 이직 사유로 실업급여를 받을 수 있어요. 인정 기준, 증빙자료, 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/업무전환-발령-퇴직-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

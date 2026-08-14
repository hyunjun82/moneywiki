import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "직장 괴롭힘으로 퇴사했다면? 증거 수집과 신청 절차",
  description: "직장 내 괴롭힘으로 퇴사하면 정당한 이직 사유로 인정돼 실업급여를 받을 수 있어요. 증거 수집 방법과 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/직장내-괴롭힘-실업급여" },
  openGraph: {
    title: "직장 괴롭힘으로 퇴사했다면? 증거 수집과 신청 절차 | 머니위키",
    description: "직장 내 괴롭힘으로 퇴사하면 정당한 이직 사유로 인정돼 실업급여를 받을 수 있어요. 증거 수집 방법과 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/직장내-괴롭힘-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

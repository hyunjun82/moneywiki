import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고용보험 미가입인데 실업급여? 소급가입 조건과 신청 방법 | 머니위키",
  description: "회사가 고용보험을 안 넣어줬어도 소급가입하면 실업급여를 받을 수 있어요. 근로복지공단 신고 방법과 필요한 증빙자료를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-고용보험-미가입" },
  openGraph: {
    title: "고용보험 미가입인데 실업급여? 소급가입 조건과 신청 방법 | 머니위키",
    description: "회사가 고용보험을 안 넣어줬어도 소급가입하면 실업급여를 받을 수 있어요. 근로복지공단 신고 방법과 필요한 증빙자료를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-고용보험-미가입",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

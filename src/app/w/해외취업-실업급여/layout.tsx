import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "해외 근무 후 귀국했다면? 실업급여 자격 조건과 신청 방법",
  description: "해외에서 취업하면 실업급여를 받을 수 없습니다. 해외 체류 중 실업인정이 안 되는 이유와 수급기간, 해외 파견 퇴사 시 대처법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/해외취업-실업급여" },
  openGraph: {
    title: "해외 근무 후 귀국했다면? 실업급여 자격 조건과 신청 방법 | 머니위키",
    description: "해외에서 취업하면 실업급여를 받을 수 없습니다. 해외 체류 중 실업인정이 안 되는 이유와 수급기간, 해외 파견 퇴사 시 대처법을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/해외취업-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

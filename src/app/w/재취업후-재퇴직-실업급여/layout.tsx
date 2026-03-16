import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "재취업 후 또 퇴직했다면? 실업급여 재수급 조건과 계산법 | 머니위키",
  description: "실업급여 받다가 재취업 후 다시 퇴직하면 남은 급여를 받을 수 있습니다. 수급기간 내 재신청 조건, 새 수급자격, 조기재취업수당 후 재퇴직까지 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재취업후-재퇴직-실업급여" },
  openGraph: {
    title: "재취업 후 또 퇴직했다면? 실업급여 재수급 조건과 계산법 | 머니위키",
    description: "실업급여 받다가 재취업 후 다시 퇴직하면 남은 급여를 받을 수 있습니다. 수급기간 내 재신청 조건, 새 수급자격, 조기재취업수당 후 재퇴직까지 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/재취업후-재퇴직-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

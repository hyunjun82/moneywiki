import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아휴직 끝나고 퇴직하면? 실업급여 수급 조건과 금액",
  description: "육아휴직 끝나고 퇴직하면 실업급여를 받을 수 있어요. 비자발적 퇴사 여부가 핵심이에요. 복직 후 퇴직, 육아휴직 중 퇴직 등 상황별 수급 조건을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아휴직-후-실업급여" },
  openGraph: {
    title: "육아휴직 끝나고 퇴직하면? 실업급여 수급 조건과 금액 | 머니위키",
    description: "육아휴직 끝나고 퇴직하면 실업급여를 받을 수 있어요. 비자발적 퇴사 여부가 핵심이에요. 복직 후 퇴직, 육아휴직 중 퇴직 등 상황별 수급 조건을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/육아휴직-후-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

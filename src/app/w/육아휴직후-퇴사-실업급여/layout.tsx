import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아휴직 후 퇴사 압박받았다면? 수급 조건과 대처법",
  description: "육아휴직 후 퇴사해도 복직 거부당했다면 비자발적 퇴사로 실업급여를 받을 수 있어요. 복직 거부 증빙 방법과 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아휴직후-퇴사-실업급여" },
  openGraph: {
    title: "육아휴직 후 퇴사 압박받았다면? 수급 조건과 대처법 | 머니위키",
    description: "육아휴직 후 퇴사해도 복직 거부당했다면 비자발적 퇴사로 실업급여를 받을 수 있어요. 복직 거부 증빙 방법과 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/육아휴직후-퇴사-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

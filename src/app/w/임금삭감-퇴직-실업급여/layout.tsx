import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임금 깎여서 퇴사하면 실업급여? 삭감 기준과 계산법",
  description: "임금이 15% 이상 삭감되면 정당한 이직 사유로 실업급여를 받을 수 있습니다. 기본급·수당·성과급 삭감 기준과 필요한 증빙서류를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임금삭감-퇴직-실업급여" },
  openGraph: {
    title: "임금 깎여서 퇴사하면 실업급여? 삭감 기준과 계산법 | 머니위키",
    description: "임금이 15% 이상 삭감되면 정당한 이직 사유로 실업급여를 받을 수 있습니다. 기본급·수당·성과급 삭감 기준과 필요한 증빙서류를 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/임금삭감-퇴직-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

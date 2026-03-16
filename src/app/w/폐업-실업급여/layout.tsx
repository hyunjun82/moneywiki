import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "회사 폐업으로 갑자기 퇴직? 실업급여 신청 절차와 서류 | 머니위키",
  description: "회사가 폐업하면 비자발적 퇴사로 실업급여를 받을 수 있습니다. 폐업·부도·파산 시 실업급여 조건, 이직확인서 처리, 체당금 신청까지 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/폐업-실업급여" },
  openGraph: {
    title: "회사 폐업으로 갑자기 퇴직? 실업급여 신청 절차와 서류 | 머니위키",
    description: "회사가 폐업하면 비자발적 퇴사로 실업급여를 받을 수 있습니다. 폐업·부도·파산 시 실업급여 조건, 이직확인서 처리, 체당금 신청까지 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/폐업-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

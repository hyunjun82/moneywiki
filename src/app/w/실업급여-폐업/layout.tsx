import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자영업자 폐업 후 실업급여 받을까? 가입 기간과 수급 조건",
  description: "회사가 폐업해서 퇴직했다면 비자발적 퇴사로 실업급여를 받을 수 있어요. 이직확인서 없이 고용센터에서 직권 처리하는 방법과 체당금 신청까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-폐업" },
  openGraph: {
    title: "자영업자 폐업 후 실업급여 받을까? 가입 기간과 수급 조건 | 머니위키",
    description: "회사가 폐업해서 퇴직했다면 비자발적 퇴사로 실업급여를 받을 수 있어요. 이직확인서 없이 고용센터에서 직권 처리하는 방법과 체당금 신청까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-폐업",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

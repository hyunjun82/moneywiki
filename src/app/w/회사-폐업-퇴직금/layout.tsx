import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "회사 폐업 시 퇴직금, 정말 못 받나요?",
  description: "회사가 폐업해도 체당금 제도를 통해 퇴직금을 받을 수 있어요. 체당금 신청 방법과 한도를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/회사-폐업-퇴직금" },
  openGraph: {
    title: "회사 폐업 시 퇴직금, 정말 못 받나요? | 머니위키",
    description: "회사가 폐업해도 체당금 제도를 통해 퇴직금을 받을 수 있어요. 체당금 신청 방법과 한도를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/회사-폐업-퇴직금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

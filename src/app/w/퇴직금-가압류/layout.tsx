import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 가압류, 소송 중에 퇴직금을 지킬 수 있나요?",
  description: "퇴직금 가압류가 걸리면 퇴직금 지급이 보류돼요. 가압류와 압류의 차이, 한도, 해제 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-가압류" },
  openGraph: {
    title: "퇴직금 가압류, 소송 중에 퇴직금을 지킬 수 있나요? | 머니위키",
    description: "퇴직금 가압류가 걸리면 퇴직금 지급이 보류돼요. 가압류와 압류의 차이, 한도, 해제 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-가압류",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

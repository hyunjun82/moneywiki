import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "명예퇴직금 세금, 일반 퇴직금이랑 다른가요? | 머니위키",
  description: "명예퇴직금 비과세 한도는 근속연수×150만원(최대 3억원)이에요. 비과세 한도와 퇴직소득세 계산법, 절세 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/명예퇴직금-세금" },
  openGraph: {
    title: "명예퇴직금 세금, 일반 퇴직금이랑 다른가요? | 머니위키",
    description: "명예퇴직금 비과세 한도는 근속연수×150만원(최대 3억원)이에요. 비과세 한도와 퇴직소득세 계산법, 절세 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/명예퇴직금-세금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

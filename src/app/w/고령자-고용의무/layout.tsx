import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "고령자 고용 의무, 우리 회사는 몇 명? 업종별 기준과 보고 방법",
  description: "300명 이상 사업장은 고령자 고용현황 보고 의무가 있어요. 제조업 2%, 운수업 6%, 기타 3% 기준고용률과 보고 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고령자-고용의무" },
  openGraph: {
    title: "고령자 고용 의무, 우리 회사는 몇 명? 업종별 기준과 보고 방법 | 머니위키",
    description: "300명 이상 사업장은 고령자 고용현황 보고 의무가 있어요. 제조업 2%, 운수업 6%, 기타 3% 기준고용률과 보고 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/고령자-고용의무",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

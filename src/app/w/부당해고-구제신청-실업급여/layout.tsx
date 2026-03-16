import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부당해고 구제 중에도 실업급여? 복직·보상별 수급 기준 | 머니위키",
  description: "부당해고 구제신청 중에도 실업급여를 받을 수 있죠. 복직되면 반환, 금전보상이면 유지. 두 절차를 동시에 진행하는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부당해고-구제신청-실업급여" },
  openGraph: {
    title: "부당해고 구제 중에도 실업급여? 복직·보상별 수급 기준 | 머니위키",
    description: "부당해고 구제신청 중에도 실업급여를 받을 수 있죠. 복직되면 반환, 금전보상이면 유지. 두 절차를 동시에 진행하는 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/부당해고-구제신청-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

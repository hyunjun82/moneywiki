import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "등록면허세 부동산·법인·자동차 세율과 납부 방법 | 머니위키",
  description: "부동산 매매 2%, 법인 설립 0.4%, 자동차 5%에 지방교육세 20% 추가돼요. 유형별 세율표와 위택스 납부 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/등록면허세" },
  openGraph: {
    title: "등록면허세 부동산·법인·자동차 세율과 납부 방법 | 머니위키",
    description: "부동산 매매 2%, 법인 설립 0.4%, 자동차 5%에 지방교육세 20% 추가돼요. 유형별 세율표와 위택스 납부 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/등록면허세",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }

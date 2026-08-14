import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국민임대주택 전용 70㎡ 입주자격, 소득·자산·청약통장 조건 정리",
  description: "국민임대주택 전용 70㎡(60㎡ 초과) 신청 자격이에요. 소득 기준(1인 120%, 2인 110%, 3인 100%), 총자산 3억6100만원 이하, 청약통장 24회 이상 조건을 정리했어요.",
  openGraph: {
    title: "국민임대주택 전용 70㎡ 입주자격, 소득·자산·청약통장 조건 정리 | 머니위키",
    description: "국민임대주택 70㎡ 신청 자격인 소득·자산·청약통장 조건을 정리했어요. 60㎡ 이하와 다른 기준을 확인하세요.",
    url: "https://www.jjyu.co.kr/w/국민임대주택-전용면적-70제곱미터-입주자격",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민임대주택-전용면적-70제곱미터-입주자격" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

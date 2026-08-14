import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "오래된 가압류 해제 방법, 소멸시효 확인부터 말소까지",
  description: "20년 된 가압류도 해제할 수 있어요. 채권 소멸시효 10년 기준, 채권자 동의·법원 소송·공시송달 3가지 방법과 말소 등기 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/오래된-가압류-해제-방법" },
  openGraph: {
    title: "오래된 가압류 해제 방법, 소멸시효 확인부터 말소까지 | 머니위키",
    description: "20년 된 가압류도 해제할 수 있어요. 채권 소멸시효 10년 기준, 채권자 동의·법원 소송·공시송달 3가지 방법과 말소 등기 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/오래된-가압류-해제-방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

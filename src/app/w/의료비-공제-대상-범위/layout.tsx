export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "의료비 공제, 뭐가 되고 뭐가 안 될까? 대상 범위부터 계산법까지 | 머니위키",
  description: "연말정산 의료비 세액공제 대상 항목과 제외 항목을 정리했어요. 공제율 15%·20%·30% 기준, 가족별 한도, 계산 예시까지 한번에 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/의료비-공제-대상-범위" },
  openGraph: {
    title: "의료비 공제, 뭐가 되고 뭐가 안 될까? 대상 범위부터 계산법까지 | 머니위키",
    description: "연말정산 의료비 세액공제 대상 항목과 제외 항목을 정리했어요. 공제율 15%·20%·30% 기준, 가족별 한도, 계산 예시까지 한번에 확인하세요.",
    url: "https://www.jjyu.co.kr/w/의료비-공제-대상-범위",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

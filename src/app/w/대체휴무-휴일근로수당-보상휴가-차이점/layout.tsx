import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대체휴무와 보상휴가, 뭐가 다른가요? 수당 차이와 근로자 권리",
  description: "대체휴무는 가산수당 50% 별도 청구 가능하고, 휴일대체는 1:1 교환이라 가산수당이 없어요. 보상휴가는 1.5배 시간으로 쉬는 제도예요. 차이를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/대체휴무-휴일근로수당-보상휴가-차이점",
  },
  openGraph: {
    title: "대체휴무 vs 보상휴가 vs 휴일대체 차이점",
    description: "수당 차이, 법적 근거, 근로자 권리까지 비교.",
    url: "https://www.jjyu.co.kr/w/대체휴무-휴일근로수당-보상휴가-차이점",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

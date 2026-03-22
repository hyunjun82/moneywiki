import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "의료비 공제, 얼마까지 받을 수 있나요? 공제율과 한도 계산법 | 머니위키",
  description: "의료비 세액공제는 총급여 3% 초과분에 15%를 적용해요. 본인·65세 이상·장애인은 한도 없고, 일반 가족은 700만원 한도예요. 난임시술비는 30% 공제돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-의료비-공제-한도",
  },
  openGraph: {
    title: "연말정산 의료비 공제율과 한도 계산법",
    description: "15% 공제, 700만원 한도, 3% 기준. 맞벌이 전략까지.",
    url: "https://www.jjyu.co.kr/w/연말정산-의료비-공제-한도",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
